import React from 'react';
import { Input } from "@/components/ui/common/input";
import { TabsContent} from "@/components/ui/common/tabs";
import { Button } from "@/components/ui/common/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/card";

interface LinksTabsContentProps {
  formState: {
    links: { [key: string]: string };
  };
  setFormState: (state: any) => void;
  handleLinkChange: (key: string, value: string) => void;
  handleRemoveLink: (key: string) => void;
  handleAddLink: () => void;
}

const LinksTabsContent: React.FC<LinksTabsContentProps> = ({
  formState,
  setFormState,
  handleLinkChange,
  handleRemoveLink,
  handleAddLink,
}) => {
  return (
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
  );
};

export default LinksTabsContent;