import { Label } from "@/components/ui/common/label";
import { TabsContent } from "@/components/ui/common/tabs";
import { Input } from "@/components/ui/common/input";
import { Textarea } from "@/components/ui/common/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/common/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/card";
import { MultiSelect } from "@/components/ui/common/multi-select";

interface FormState {
  name: string;
  status: string;
  description: string;
  type: string;
  linkedService?: string;
  effort?: number;
  timesUsed?: number;
  linkedAccelerators?: string[];
}

interface OverviewTabsContentProps {
  formState: FormState;
  handleInputChange: (field: string, value: any) => void;
  itemNames: { name: string; type: string }[];
}

const OverviewTabsContent: React.FC<OverviewTabsContentProps> = ({ formState, handleInputChange, itemNames }) => {
  return (
    <TabsContent value="overview">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formState.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>
          {formState.type === 'accelerator' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedService">Linked Service</Label>
                  <Select
                    onValueChange={(value) => handleInputChange('linkedService', value)}
                    defaultValue={formState.linkedService}
                  >
                    <SelectTrigger id="linkedService">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemNames.filter(item => item.type === 'service').map(service => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effort">Effort (hours)</Label>
                  <Input
                    id="effort"
                    type="number"
                    value={formState.effort}
                    onChange={(e) => handleInputChange('effort', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timesUsed">Times Used</Label>
                <Input
                  id="timesUsed"
                  type="number"
                  value={formState.timesUsed}
                  onChange={(e) => handleInputChange('timesUsed', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedAccelerators">Linked Accelerators</Label>
                <MultiSelect
                  options={itemNames.filter(item => item.type === 'accelerator').map(a => ({ label: a.name, value: a.name }))}
                  onValueChange={(value) => handleInputChange('linkedAccelerators', value)}
                  defaultValue={formState.linkedAccelerators}
                  placeholder="Select linked accelerators"
                  className="w-full"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default OverviewTabsContent;