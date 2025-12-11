import { Link } from 'react-router-dom';
import { Service } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight, CheckCircle } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group hover-lift bg-card border-border/50 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {service.category}
          </Badge>
        </div>
        <h3 className="font-display font-semibold text-lg mt-3 text-foreground group-hover:text-primary transition-colors">
          {service.title}
        </h3>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {service.description}
        </p>
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Required Documents:</p>
          <div className="flex flex-wrap gap-1.5">
            {service.requiredDocuments.slice(0, 3).map((doc, index) => (
              <span 
                key={index}
                className="inline-flex items-center text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground"
              >
                <CheckCircle className="w-3 h-3 mr-1 text-success" />
                {doc}
              </span>
            ))}
            {service.requiredDocuments.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{service.requiredDocuments.length - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/services/${service.id}`} className="w-full">
          <Button variant="outline" className="w-full group/btn">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
