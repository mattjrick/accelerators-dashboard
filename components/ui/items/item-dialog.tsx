import { useState, useEffect } from 'react';
import {
  DialogFooter,
} from "@/components/ui/common/dialog";
import { Button } from "@/components/ui/common/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/common/tabs";
import { ScrollArea } from "@/components/ui/common/scroll-area";
import OverviewTabsContent from '@/components/ui/overviewtabscontent';
import StoryBrandTabsContent from "@/components/ui/storybrandtabscontent";
import LinksTabsContent from "@/components/ui/linkstabcontent";
import { addItemFromForm, updateItemFromForm, getItem } from '../../../lib/actions';
import { Spinner } from '@/components/icons';
import { ItemFormState } from '@/types/item';
import { Character } from '@/types/storybrand';

interface ItemDialogProps {
  onClose: () => void;
  isEditMode?: boolean;
  selectedItemId?: number | null;
  itemNames: { name: string; type?: string }[];
  initialType?: 'service' | 'accelerator';
}

export function ItemDialog({
  onClose,
  isEditMode = false,
  selectedItemId = null,
  itemNames,
  initialType = 'accelerator',
}: ItemDialogProps) {
  const [itemNamesWithTypes, setItemNamesWithTypes] = useState(itemNames.map(item => ({ ...item, type: item.type ?? '' })));
  const [formState, setFormState] = useState<ItemFormState>({
    type: initialType,
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

  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode && selectedItemId) {
      const fetchData = async () => {
        try {
          const data = await getItem(selectedItemId);
          const formattedData: ItemFormState = {
            ...data,
            linkedService: data.linkedService ?? '',
            linkedAccelerators: data.linkedAccelerators ?? [],
            effort: data.effort ?? 0,
            timesUsed: data.timesUsed ?? 0,
            storyBranding: data.storyBranding as { characters: Character[] },
            links: data.links as Record<string, string>,
          };
          setFormState((prevState: ItemFormState) => ({
            ...prevState,
            ...formattedData,
          }));
        } catch (error) {
          console.error('Failed to fetch item data');
        } finally {
          setLoading(false);
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
        await updateItemFromForm(formData);
      } else {
        await addItemFromForm(formData);
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
              itemNames={itemNamesWithTypes}
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