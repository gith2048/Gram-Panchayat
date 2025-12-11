import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Target, Award, Shield, Clock } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Transparency',
    description: 'All processes are tracked and visible to citizens, ensuring complete transparency.',
  },
  {
    icon: Clock,
    title: 'Efficiency',
    description: 'Digital processes reduce waiting times and paperwork significantly.',
  },
  {
    icon: Users,
    title: 'Accessibility',
    description: 'Services available 24/7 from any location with internet access.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Standardized procedures ensure consistent service delivery.',
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold">
                  About Digital E-Gram Panchayat
                </h1>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              A Government of India initiative to bring digital governance to rural India, 
              making government services accessible, transparent, and efficient for all citizens.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Digital E-Gram Panchayat project aims to computerize Gram Panchayat services 
                and improve citizen service delivery in villages across India. Our goal is to 
                bridge the digital divide and bring the benefits of e-governance to rural communities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Through this platform, citizens can apply for various government schemes, 
                certificates, and services online from the comfort of their homes. They can 
                also track their application status in real-time, eliminating the need for 
                multiple visits to government offices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Staff and Officers can efficiently manage, process, and approve applications 
                through a streamlined digital workflow, ensuring faster service delivery and 
                better governance.
              </p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-10 h-10 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Key Objectives
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Digitize all Gram Panchayat services and schemes',
                  'Enable online application and tracking',
                  'Reduce processing time and paperwork',
                  'Ensure transparency in service delivery',
                  'Provide 24/7 access to government services',
                  'Empower citizens with information',
                ].map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-success text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              The principles that guide our service delivery
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-elevated transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Need Help?
          </h2>
          <p className="text-muted-foreground mb-8">
            If you have any questions or need assistance, our support team is here to help.
          </p>
          <Card>
            <CardContent className="py-8">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-semibold text-foreground">Helpline</p>
                  <p className="text-primary">1800-XXX-XXXX</p>
                  <p className="text-sm text-muted-foreground">(Toll Free)</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-primary">support@egrampanchayat.gov.in</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Working Hours</p>
                  <p className="text-muted-foreground">Mon - Sat: 9 AM - 6 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
