'use client'

import React, { useState, useEffect } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AcceleratorFormState } from '@/types/accelerator'
import { getAccelerator } from './actions'
import { Spinner } from '@/components/icons'
import { Character } from '@/types/storybrand'
import { ScrollArea } from "@/components/ui/scroll-area"
import LandingPagePreview from '@/components/ui/landing-page-preview'

interface AcceleratorViewProps {
  selectedItemId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function AcceleratorViewComponent({ selectedItemId, isOpen, onClose }: AcceleratorViewProps) {
  const [accelerator, setAccelerator] = useState<AcceleratorFormState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        setLoading(true)
        try {
          const data = await getAccelerator(selectedItemId)
          setAccelerator({
            ...data,
            storyBranding: data.storyBranding as { characters: Character[] },
            links: data.links as Record<string, string>,
          })
        } catch (error) {
          console.error('Failed to fetch accelerator data', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [selectedItemId, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : accelerator ? (
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 py-4 border-b">
              <div className="flex justify-between items-start mb-2">
                <DialogTitle className="text-2xl font-bold pr-8">
                  {accelerator.name}
                </DialogTitle>
                <Badge variant={accelerator.status === 'active' ? 'default' : 'secondary'} className="mr-6">
                  {accelerator.status}
                </Badge>
              </div>
              <DialogDescription>{accelerator.description}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-grow px-6 py-4">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="characters">Characters</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Linked Service</h3>
                        <p>{accelerator.linkedService}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Effort</h3>
                        <p>{accelerator.effort} hours</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Times Used</h3>
                        <p>{accelerator.timesUsed}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Linked Accelerators</h3>
                      <ul className="list-disc list-inside">
                        {accelerator.linkedAccelerators.map((acc, index) => (
                          <li key={index}>{acc}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Value Statement</h3>
                      <Tabs defaultValue={accelerator.storyBranding.characters[0].character}>
                        <TabsList>
                          {accelerator.storyBranding.characters.map((character, index) => (
                            <TabsTrigger key={index} value={character.character}>
                              {character.character}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {accelerator.storyBranding.characters.map((character, index) => (
                          <TabsContent key={index} value={character.character}>
                            <LandingPagePreview content={character.landingPage} />
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="characters">
                  <Tabs defaultValue={accelerator.storyBranding.characters[0].character}>
                    <TabsList className="mb-4">
                      {accelerator.storyBranding.characters.map((character, index) => (
                        <TabsTrigger key={index} value={character.character}>
                          {character.character}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {accelerator.storyBranding.characters.map((character, index) => (
                      <TabsContent key={index} value={character.character}>
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg">{character.character}</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium">Want</p>
                              <p>{character.want}</p>
                            </div>
                            <div>
                              <p className="font-medium">External Problem</p>
                              <p>{character.externalProblem}</p>
                            </div>
                            <div>
                              <p className="font-medium">Internal Problem</p>
                              <p>{character.internalProblem}</p>
                            </div>
                            <div>
                              <p className="font-medium">Philosophical Problem</p>
                              <p>{character.philosophicalProblem}</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Empathy Statement</p>
                            <p>{character.empathyStatement}</p>
                          </div>
                          <div>
                            <p className="font-medium">Authority Statement</p>
                            <p>{character.authorityStatement}</p>
                          </div>
                          <div>
                            <p className="font-medium">Plan</p>
                            <p>{character.plan}</p>
                          </div>
                          <div>
                            <p className="font-medium">Call to Action</p>
                            <p>{character.callToActions}</p>
                          </div>
                          <div>
                            <p className="font-medium">Avoid Failure</p>
                            <p>{character.avoidFailure}</p>
                          </div>
                          <div>
                            <p className="font-medium">Success Looks Like</p>
                            <p>{character.successLooksLike}</p>
                          </div>
                          <div>
                            <p className="font-medium">One-liner</p>
                            <p>{character.oneLiner}</p>
                          </div>
                          <div>
                            <p className="font-medium">Elevator Pitch</p>
                            <p>{character.elevatorPitch}</p>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </TabsContent>
                <TabsContent value="resources">
                  <div className="space-y-4">
                    {Object.entries(accelerator.links).map(([key, value]) => (
                      <div key={key}>
                        <h3 className="font-semibold capitalize mb-1">{key}</h3>
                        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {value}
                        </a>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
          </div>
        ) : (
          <div className="p-6">No data available</div>
        )}
      </DialogContent>
    </Dialog>
  )
}