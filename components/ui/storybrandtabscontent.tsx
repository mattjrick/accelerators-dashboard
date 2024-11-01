import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/common/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/card";
import { Button } from "@/components/ui/common/button";
import { PlusCircle } from 'lucide-react';
import { Textarea } from "@/components/ui/common/textarea";
import { Input } from "@/components/ui/common/input";
import { Label } from "@/components/ui/common/label";
import { ItemFormState } from '@/types/item';

interface StoryBrandTabsContentProps {
  formState: ItemFormState;
  setFormState: (state: ItemFormState) => void;
}

const StoryBrandTabsContent: React.FC<StoryBrandTabsContentProps> = ({
  formState,
  setFormState
}) => {
  const [activeCharacter, setActiveCharacter] = useState(0);

  const handleCharacterChange = (index: number, field: string, value: any) => {
    const newCharacters = [...formState.storyBranding.characters];
    newCharacters[index] = {
      ...newCharacters[index],
      [field]: value,
    };
    setFormState({
      ...formState,
      storyBranding: {
        ...formState.storyBranding,
        characters: newCharacters,
      },
    });
  };

  const handleAddCharacter = () => {
    setFormState({
      ...formState,
      storyBranding: {
        ...formState.storyBranding,
        characters: [
          ...formState.storyBranding.characters,
          {
            character: 'New character',
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
    setActiveCharacter(formState.storyBranding.characters.length);
  };

  return (
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
              {formState.storyBranding.characters.map((char, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {char.character || `Character ${index + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>
            {formState.storyBranding.characters.map((character, charIndex) => (
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
                        onChange={(e) => handleCharacterChange(charIndex, 'callToActions', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`avoidFailure-${charIndex}`}>Avoid Failure</Label>
                      <Input
                        id={`avoidFailure-${charIndex}`}
                        value={character.avoidFailure}
                        onChange={(e) => handleCharacterChange(charIndex, 'avoidFailure', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`successLooksLike-${charIndex}`}>Success Looks Like</Label>
                    <Textarea
                      id={`successLooksLike-${charIndex}`}
                      value={character.successLooksLike}
                      onChange={(e) => handleCharacterChange(charIndex, 'successLooksLike', e.target.value)}
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
                      onChange={(e) => handleCharacterChange(charIndex, 'elevatorPitch', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`landingPage-${charIndex}`}>Landing Page</Label>
                    <Textarea
                      id={`landingPage-${charIndex}`}
                      value={character.landingPage}
                      onChange={(e) => handleCharacterChange(charIndex, 'landingPage', e.target.value)}
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
  );
};

export default StoryBrandTabsContent;