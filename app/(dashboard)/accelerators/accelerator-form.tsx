import { useState, useEffect } from 'react';
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import OverviewTabsContent from '@/components/ui/overviewtabscontent';
import StoryBrandTabsContent from "@/components/ui/storybrandtabscontent";
import LinksTabsContent from "@/components/ui/linkstabcontent";
import { addAcceleratorFromForm, updateAcceleratorFromForm, getAccelerator } from './actions';
import { Spinner } from '@/components/icons';
import { AcceleratorFormState } from '@/types/accelerator';
import { Character } from '@/types/storybrand';

interface AcceleratorDialogProps {
  onClose: () => void;
  isEditMode?: boolean;
  selectedItemId?: number | null;
  acceleratorNames: { name: string }[];
}

export function AcceleratorDialog({
  onClose,
  isEditMode = false,
  selectedItemId = null,
  acceleratorNames,
}: AcceleratorDialogProps) {
  const [formState, setFormState] = useState<AcceleratorFormState>({
    name: '',
    description: '',
    linkedService: '',
    linkedAccelerators: [],
    status: 'active',
    effort: 0,
    timesUsed: 0,
    storyBranding: {
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

  const [loading, setLoading] = useState(isEditMode); // Initialize loading state

  useEffect(() => {
    if (isEditMode && selectedItemId) {
      const fetchData = async () => {
        try {
          const data = await getAccelerator(selectedItemId);
          const formattedData: AcceleratorFormState = {
            ...data,
            storyBranding: data.storyBranding as { characters: Character[] },
            links: data.links as Record<string, string>,
          };
          setFormState((prevState: AcceleratorFormState) => ({
            ...prevState,
            ...formattedData,
          }));
        } catch (error) {
          console.error('Failed to fetch accelerator data');
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      };
  
      fetchData();
    }
  }, [isEditMode, selectedItemId]);

  const handleInputChange = (field: string, value: any) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };


  const handleLinkChange = (key: string, value: any) => {
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
      delete newLinks[key as keyof typeof newLinks];
      return { ...prevState, links: newLinks };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      ...formState,
    };
    console.log(formData);
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
    console.log(acceleratorNames),
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
                formState={formState}
                setFormState={setFormState}
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