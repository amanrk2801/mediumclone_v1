import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, StarIcon } from "lucide-react";
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function MembershipPage() {
  const { darkMode } = useDarkMode(); 
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
    <div className={`container mx-auto px-4 py-8 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`text-4xl font-serif mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Membership Plans</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`flex flex-col h-full transition-colors duration-200 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
            shadow="md" 
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <StarIcon 
                  className={`mr-2 h-6 w-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} 
                />
                <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </span>
              </CardTitle>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {plan.price}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon 
                      className={`mr-2 h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'}`} 
                    />
                    <span className={`text-gray-700 dark:text-gray-300`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  selectedPlan === plan.name
                    ? darkMode 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : darkMode 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                } transition-colors duration-200`}
                onClick={() => handleSelectPlan(plan.name)}
                disabled={selectedPlan === plan.name}
              >
                {selectedPlan === plan.name ? 'Selected' : 'Get Started'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
