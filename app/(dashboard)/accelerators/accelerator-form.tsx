'use client'

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from 'lucide-react';
import { addAcceleratorFromForm, updateAcceleratorFromForm, getAccelerator } from './actions';

export function AcceleratorDialog({ isOpen, onClose, isEditMode = false, selectedItemId = null, acceleratorNames }) {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    linked_service: '',
    linked_accelerators: [''],
    status: 'active',
    effort: 0,
    times_used: 0,
    story_branding: {
      characters: [
        {
          character: '',
          want: '',
          externalProblem: '',
          internalProblem: '',
          philosophicalProblem: '',
          empathyStatement: '',
          authorityStatement: '',
          plan: '',
          callToActions: '',
          avoidFailure: '',
          successLooksLike: '',
          oneLiner: '',
          elevatorPitch: '',
          landingPage: '',
        },
      ],
    },
    links: {},
  });

  const [activeCharacter, setActiveCharacter] = useState(0);

  useEffect(() => {
    if (isEditMode && selectedItemId) {
      const fetchData = async () => {
        try {
          const data = await getAccelerator(selectedItemId);
          setFormState((prevState) => ({
            ...prevState,
            ...data,
            story_branding: data.storyBranding || prevState.story_branding,
            links: data.links || prevState.links,
          }));
        } catch (error) {
          console.error('Failed to fetch accelerator data:', error);
        }
      };

      fetchData();
    }
  }, [isEditMode, selectedItemId]);

  const handleInputChange = (field, value) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleCharacterChange = (index, field, value) => {
    const newCharacters = [...formState.story_branding.characters];
    newCharacters[index] = {
      ...newCharacters[index],
      [field]: value,
    };
    setFormState({
      ...formState,
      story_branding: {
        ...formState.story_branding,
        characters: newCharacters,
      },
    });
  };

  const handleAddCharacter = () => {
    setFormState({
      ...formState,
      story_branding: {
        ...formState.story_branding,
        characters: [
          ...formState.story_branding.characters,
          {
            character: '',
            want: '',
            externalProblem: '',
            internalProblem: '',
            philosophicalProblem: '',
            empathyStatement: '',
            authorityStatement: '',
            plan: '',
            callToActions: '',
            avoidFailure: '',
            successLooksLike: '',
            oneLiner: '',
            elevatorPitch: '',
            landingPage: '',
          },
        ],
      },
    });
    setActiveCharacter(formState.story_branding.characters.length);
  };

  const handleLinkChange = (key, value) => {
    setFormState((prevState) => ({
      ...prevState,
      links: {
        ...prevState.links,
        [key]: value,
      },
    }));
  };

  const handleAddLink = () => {
    setFormState((prevState) => ({
      ...prevState,
      links: {
        ...prevState.links,
        [``]: '',
      },
    }));
  };

  const handleRemoveLink = (key) => {
    setFormState((prevState) => {
      const newLinks = { ...prevState.links };
      delete newLinks[key];
      return { ...prevState, links: newLinks };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.name || formState.linked_accelerators.some(accelerator => !accelerator)) {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = {
      ...formState,
    };

    try {
      if (isEditMode) {
        await updateAcceleratorFromForm(formData);
      } else {
        await addAcceleratorFromForm(formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    console.log(acceleratorNames),
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <Tabs defaultValue="overview" className="flex flex-col h-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="storybranding">Storybranding</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
        </TabsList>

        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Accelerator Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formState.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linked_service">Linked Service</Label>
                        <Input
                          id="linked_service"
                          value={formState.linked_service}
                          onChange={(e) => handleInputChange('linked_service', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formState.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="effort">Effort (hours)</Label>
                        <Input
                          id="effort"
                          type="number"
                          value={formState.effort}
                          onChange={(e) => handleInputChange('effort', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          onValueChange={(value) => handleInputChange('status', value)}
                          defaultValue={formState.status}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Linked Accelerators</Label>
                      {formState.linked_accelerators.map((accelerator, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={accelerator}
                            onChange={(e) => {
                              const newAccelerators = [...formState.linked_accelerators];
                              newAccelerators[index] = e.target.value;
                              handleInputChange('linked_accelerators', newAccelerators);
                            }}
                            placeholder="Enter accelerator"
                          />
                          {index === formState.linked_accelerators.length - 1 && (
                            <Button type="button" onClick={() => handleInputChange('linked_accelerators', [...formState.linked_accelerators, ''])}>
                              Add
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="storybranding">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Storybranding</span>
                      <Button type="button" onClick={handleAddCharacter} size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Character
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeCharacter.toString()} onValueChange={(value) => setActiveCharacter(parseInt(value))}>
                      <TabsList className="mb-4">
                        {formState.story_branding.characters.map((char, index) => (
                          <TabsTrigger key={index} value={index.toString()}>
                            {char.character || `Character ${index + 1}`}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {formState.story_branding.characters.map((character, charIndex) => (
                        <TabsContent key={charIndex} value={charIndex.toString()}>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`character-${charIndex}`}>Character Name</Label>
                                <Input
                                  id={`character-${charIndex}`}
                                  value={character.character}
                                  onChange={(e) => handleCharacterChange(charIndex, 'character', e.target.value)}
                                  placeholder="Enter character name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`want-${charIndex}`}>Want</Label>
                                <Input
                                  id={`want-${charIndex}`}
                                  value={character.want}
                                  onChange={(e) => handleCharacterChange(charIndex, 'want', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`externalProblem-${charIndex}`}>External Problem</Label>
                                <Input
                                  id={`externalProblem-${charIndex}`}
                                  value={character.externalProblem}
                                  onChange={(e) => handleCharacterChange(charIndex, 'externalProblem', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`internalProblem-${charIndex}`}>Internal Problem</Label>
                                <Input
                                  id={`internalProblem-${charIndex}`}
                                  value={character.internalProblem}
                                  onChange={(e) => handleCharacterChange(charIndex, 'internalProblem', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`philosophicalProblem-${charIndex}`}>Philosophical Problem</Label>
                              <Input
                                id={`philosophicalProblem-${charIndex}`}
                                value={character.philosophicalProblem}
                                onChange={(e) => handleCharacterChange(charIndex, 'philosophicalProblem', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`empathyStatement-${charIndex}`}>Empathy Statement</Label>
                                <Textarea
                                  id={`empathyStatement-${charIndex}`}
                                  value={character.empathyStatement}
                                  onChange={(e) => handleCharacterChange(charIndex, 'empathyStatement', e.target.value)}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`authorityStatement-${charIndex}`}>Authority Statement</Label>
                                <Textarea
                                  id={`authorityStatement-${charIndex}`}
                                  value={character.authorityStatement}
                                  onChange={(e) => handleCharacterChange(charIndex, 'authorityStatement', e.target.value)}
                                  rows={3}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`plan-${charIndex}`}>Plan</Label>
                              <Textarea
                                id={`plan-${charIndex}`}
                                value={character.plan}
                                onChange={(e) => handleCharacterChange(charIndex, 'plan', e.target.value)}
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`callToActions-${charIndex}`}>Call to Actions</Label>
                                <Input
                                  id={`callToActions-${charIndex}`}
                            
                                  value={character.callToActions}
                                  onChange={(e) => 
                                    handleCharacterChange(charIndex, 'callToActions', e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`avoidFailure-${charIndex}`}>Avoid Failure</Label>
                                <Input
                                  id={`avoidFailure-${charIndex}`}
                                  value={character.avoidFailure}
                                  onChange={(e) =>
                                    handleCharacterChange(charIndex, 'avoidFailure', e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`successLooksLike-${charIndex}`}>Success Looks Like</Label>
                              <Textarea
                                id={`successLooksLike-${charIndex}`}
                                value={character.successLooksLike}
                                onChange={(e) =>
                                  handleCharacterChange(charIndex, 'successLooksLike', e.target.value)
                                }
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`oneLiner-${charIndex}`}>One Liner</Label>
                              <Textarea
                                id={`oneLiner-${charIndex}`}
                                value={character.oneLiner}
                                onChange={(e) => handleCharacterChange(charIndex, 'oneLiner', e.target.value)}
                                rows={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`elevatorPitch-${charIndex}`}>Elevator Pitch</Label>
                              <Textarea
                                id={`elevatorPitch-${charIndex}`}
                                value={character.elevatorPitch}
                                onChange={(e) =>
                                  handleCharacterChange(charIndex, 'elevatorPitch', e.target.value)
                                }
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`landingPage-${charIndex}`}>Landing Page</Label>
                              <Textarea
                                id={`landingPage-${charIndex}`}
                                value={character.landingPage}
                                onChange={(e) =>
                                  handleCharacterChange(charIndex, 'landingPage', e.target.value)
                                }
                                rows={5}
                              />
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="links">
                <Card>
                  <CardHeader>
                    <CardTitle>Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(formState.links).map(([key, value], index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={key}
                          onChange={(e) => {
                            const newKey = e.target.value;
                            const newLinks = { ...formState.links };
                            delete newLinks[key];
                            newLinks[newKey] = value;
                            setFormState({ ...formState, links: newLinks });
                          }}
                          placeholder="Link key"
                        />
                        <Input
                          value={value as string}
                          onChange={(e) => handleLinkChange(key, e.target.value)}
                          placeholder="Link value"
                        />
                        <Button type="button" onClick={() => handleRemoveLink(key)}>Remove</Button>
                      </div>
                    ))}
                    <Button type="button" onClick={handleAddLink} className="w-full">Add Link</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="mt-4">
          <Button type="submit">{isEditMode ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </Tabs>
    </form>
  );
}