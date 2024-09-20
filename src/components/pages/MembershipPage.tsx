import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, StarIcon } from "lucide-react";

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Medium Member",
      price: "$5/month or $60/year",
      features: [
        "Read member-only stories",
        "Support writers you read most",
        "Earn money for your writing",
        "Listen to audio narrations",
        "Read offline with the Medium app",
      ],
    },
    {
      name: "Friend of Medium",
      price: "$15/month or $150/year",
      features: [
        "All Medium member benefits",
        "Give 4x more to the writers you read",
        "Share member-only stories with anyone and drive more earnings for writers",
        "Customize app icon",
      ],
    },
  ];

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    // Here you would typically initiate the subscription process
    console.log(`Selected plan: ${planName}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif mb-8">Membership plans</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <StarIcon className="mr-2 h-6 w-6 text-yellow-400" />
                {plan.name}
              </CardTitle>
              <p className="text-2xl font-bold">{plan.price}</p>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${selectedPlan === plan.name ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                onClick={() => handleSelectPlan(plan.name)}
                disabled={selectedPlan === plan.name}
              >
                {selectedPlan === plan.name ? 'Selected' : 'Get started'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
