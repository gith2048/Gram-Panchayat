import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SERVICE_CATEGORIES } from '@/data/mockData';
import { ArrowLeft, Plus, X, Loader2, FileText } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function ServiceForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    eligibility: '',
    isActive: true,
  });
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>(['']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDocument = () => {
    setRequiredDocuments([...requiredDocuments, '']);
  };

  const handleRemoveDocument = (index: number) => {
    setRequiredDocuments(requiredDocuments.filter((_, i) => i !== index));
  };

  const handleDocumentChange = (index: number, value: string) => {
    const updated = [...requiredDocuments];
    updated[index] = value;
    setRequiredDocuments(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Service Created',
      description: 'The new service has been created successfully.',
    });

    navigate('/admin/services');
  };

  return (
    <Layout>
      <div className="bg-muted/30 min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="bg-background border-b border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={() => navigate('/admin/services')}
              className="flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Create New Service
                </h1>
                <p className="text-muted-foreground">
                  Add a new Gram Panchayat service or scheme
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
                <CardDescription>
                  Enter the basic information about the service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Birth Certificate"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_CATEGORIES.filter(c => c !== 'All Categories').map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the service and its benefits..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eligibility">Eligibility Criteria *</Label>
                  <Textarea
                    id="eligibility"
                    name="eligibility"
                    placeholder="Who is eligible for this service..."
                    value={formData.eligibility}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Required Documents</Label>
                  {requiredDocuments.map((doc, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Document ${index + 1}`}
                        value={doc}
                        onChange={(e) => handleDocumentChange(index, e.target.value)}
                      />
                      {requiredDocuments.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveDocument(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddDocument}
                  >
                    <Plus className="w-4 h-4" />
                    Add Document
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label htmlFor="isActive">Service Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Make this service available to citizens
                    </p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/services')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Service'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
