import { useState, useEffect } from 'react';
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import OverviewTabsContent from '@/components/acceleratorform/overviewtabscontent';
import StoryBrandTabsContent from "@/components/acceleratorform/storybrandtabscontent";
import LinksTabsContent from "@/components/acceleratorform/linkstabcontent";
import { addAcceleratorFromForm, updateAcceleratorFromForm, getAccelerator } from './actions';
import { Spinner } from '@/components/icons';

export function AcceleratorDialog({ onClose, isEditMode = false, selectedItemId = null, acceleratorNames }) {
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
  const [loading, setLoading] = useState(isEditMode); // Initialize loading state

  useEffect(() => {
    if (isEditMode && selectedItemId) {
      const fetchData = async () => {
        try {
          const data = await getAccelerator(selectedItemId);
          setFormState((prevState) => ({
            ...prevState,
            ...data,
            linked_accelerators: data.linkedAccelerators || prevState.linked_accelerators,
            linked_service: data.linkedService || prevState.linked_service,
            times_used: data.timesUsed || prevState.times_used,
            story_branding: data.storyBranding ? { characters: data.storyBranding.characters || prevState.story_branding.characters } : prevState.story_branding,
            links: data.links || prevState.links,
          }));
        } catch (error) {
          console.error('Failed to fetch accelerator data:', error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
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

  if (loading) {
    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner />
    </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-[90%]">
      <Tabs defaultValue="overview" className="flex flex-col h-[90%]">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="storybranding">Storybranding</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
        </TabsList>
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">

              <OverviewTabsContent
                formState={formState}
                handleInputChange={handleInputChange}
                acceleratorNames={acceleratorNames}
              />

              
              <StoryBrandTabsContent
                activeCharacter={activeCharacter}
                formState={formState}
                handleAddCharacter={handleAddCharacter}
                handleCharacterChange={handleCharacterChange}
                setActiveCharacter={setActiveCharacter}
              />

              <LinksTabsContent
                formState={formState}
                setFormState={setFormState}
                handleLinkChange={handleLinkChange}
                handleRemoveLink={handleRemoveLink}
                handleAddLink={handleAddLink}
              />
            </div>
          </ScrollArea>
      </Tabs>
      <DialogFooter className="mt-4">
        <Button type="submit">{isEditMode ? 'Update' : 'Create'}</Button>
      </DialogFooter>
    </form>
  );
}