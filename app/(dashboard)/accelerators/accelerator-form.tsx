"use client"

import { useState, useEffect } from 'react';
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addAcceleratorFromForm, updateAcceleratorFromForm, getAccelerator } from './actions';

export function AcceleratorDialog({ isEditMode = false, selectedItemId = null }) {
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

  const handleInputChange = (field: string, value: string | number) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleNestedInputChange = (section: string, field: string, value: string | number) => {
    setFormState({
      ...formState,
      [section]: {
        ...(formState as any)[section],
        [field]: value,
      },
    });
  };

  const handleCharacterChange = (index: number, field: string, value: string) => {
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
  };

  const handleLinkChange = (key: string, value: string) => {
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

  const handleRemoveLink = (key: string) => {
    setFormState((prevState) => {
      const newLinks = { ...prevState.links };
      delete (newLinks as any)[key];
      return { ...prevState, links: newLinks };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="storybranding">Storybranding</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={formState.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                value={formState.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linked_service" className="text-right">Linked Service</Label>
              <Input
                id="linked_service"
                value={formState.linked_service}
                onChange={(e) => handleInputChange('linked_service', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linked_accelerators" className="text-right">Linked Accelerators</Label>
              <div className="col-span-3">
                {formState.linked_accelerators.map((accelerator, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      id={`accelerator-${index}`}
                      value={accelerator}
                      onChange={(e) => handleNestedInputChange('linked_accelerators', index, e.target.value)}
                      placeholder="Enter accelerator"
                    />
                    {index === formState.linked_accelerators.length - 1 && (
                      <Button type="button" onClick={handleAddCharacter}>
                        Add Accelerator
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="effort" className="text-right">Effort</Label>
              <Input
                id="effort"
                type="number"
                value={formState.effort}
                onChange={(e) => handleInputChange('effort', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select
                onValueChange={(value) => handleInputChange('status', value)}
                defaultValue={formState.status}
              >
                <SelectTrigger id="status" className="col-span-3">
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
        </TabsContent>

        <TabsContent value="storybranding">
          <div className="grid gap-4 py-4">
            {formState.story_branding.characters.map((character, index) => (
              <div key={index} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`character-${index}`} className="text-right">Character</Label>
                  <Input
                    id={`character-${index}`}
                    value={character.character}
                    onChange={(e) => handleCharacterChange(index, 'character', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`want-${index}`} className="text-right">Want</Label>
                  <Input
                    id={`want-${index}`}
                    value={character.want}
                    onChange={(e) => handleCharacterChange(index, 'want', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`externalProblem-${index}`} className="text-right">External Problem</Label>
                  <Input
                    id={`externalProblem-${index}`}
                    value={character.externalProblem}
                    onChange={(e) => handleCharacterChange(index, 'externalProblem', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`internalProblem-${index}`} className="text-right">Internal Problem</Label>
                  <Input
                    id={`internalProblem-${index}`}
                    value={character.internalProblem}
                    onChange={(e) => handleCharacterChange(index, 'internalProblem', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`philosophicalProblem-${index}`} className="text-right">Philosophical Problem</Label>
                  <Input
                    id={`philosophicalProblem-${index}`}
                    value={character.philosophicalProblem}
                    onChange={(e) => handleCharacterChange(index, 'philosophicalProblem', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`empathyStatement-${index}`} className="text-right">Empathy Statement</Label>
                  <Input
                    id={`empathyStatement-${index}`}
                    value={character.empathyStatement}
                    onChange={(e) => handleCharacterChange(index, 'empathyStatement', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`authorityStatement-${index}`} className="text-right">Authority Statement</Label>
                  <Input
                    id={`authorityStatement-${index}`}
                    value={character.authorityStatement}
                    onChange={(e) => handleCharacterChange(index, 'authorityStatement', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`plan-${index}`} className="text-right">Plan</Label>
                  <Input
                    id={`plan-${index}`}
                    value={character.plan}
                    onChange={(e) => handleCharacterChange(index, 'plan', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`callToActions-${index}`} className="text-right">Call to Actions</Label>
                  <Input
                    id={`callToActions-${index}`}
                    value={character.callToActions}
                    onChange={(e) => handleCharacterChange(index, 'callToActions', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`avoidFailure-${index}`} className="text-right">Avoid Failure</Label>
                  <Input
                    id={`avoidFailure-${index}`}
                    value={character.avoidFailure}
                    onChange={(e) => handleCharacterChange(index, 'avoidFailure', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`successLooksLike-${index}`} className="text-right">Success Looks Like</Label>
                  <Input
                    id={`successLooksLike-${index}`}
                    value={character.successLooksLike}
                    onChange={(e) => handleCharacterChange(index, 'successLooksLike', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`oneLiner-${index}`} className="text-right">One Liner</Label>
                  <Textarea
                    id={`oneLiner-${index}`}
                    value={character.oneLiner}
                    onChange={(e) => handleCharacterChange(index, 'oneLiner', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`elevatorPitch-${index}`} className="text-right">Elevator Pitch</Label>
                  <Textarea
                    id={`elevatorPitch-${index}`}
                    value={character.elevatorPitch}
                    onChange={(e) => handleCharacterChange(index, 'elevatorPitch', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`landingPage-${index}`} className="text-right">Landing Page</Label>
                  <Textarea
                    id={`landingPage-${index}`}
                    value={character.landingPage}
                    onChange={(e) => handleCharacterChange(index, 'landingPage', e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
            ))}
            <Button type="button" onClick={handleAddCharacter}>Add Character</Button>
          </div>
        </TabsContent>

        <TabsContent value="links">
          <div className="grid gap-4 py-4">
            {Object.entries(formState.links).map(([key, value], index) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <Input
                  id={`link-key-${index}`}
                  value={key}
                  onChange={(e) => {
                    const newKey = e.target.value;
                    const newLinks = { ...formState.links };
                    delete newLinks[key];
                    (newLinks as any)[newKey] = value;
                    setFormState({ ...formState, links: newLinks });
                  }}
                  placeholder="Link key"
                  className="col-span-2"
                />
                <Input
                  id={`link-value-${index}`}
                  value={value as string}
                  onChange={(e) => handleLinkChange(key, e.target.value)}
                  placeholder="Link value"
                  className="col-span-2"
                />
                <Button type="button" onClick={() => handleRemoveLink(key)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddLink}>Add Link</Button>
          </div>
        </TabsContent>

      </Tabs>
      <DialogFooter>
        <Button type="submit">{isEditMode ? 'Update' : 'Create'}</Button>
      </DialogFooter>
    </form>
  );
}