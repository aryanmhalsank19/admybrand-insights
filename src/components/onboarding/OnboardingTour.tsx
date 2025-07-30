import { useState, useEffect } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

interface OnboardingTourProps {
  run: boolean;
  onComplete: () => void;
}

const steps: Step[] = [
  {
    target: '.metric-cards',
    content: 'These metric cards show your key performance indicators with real-time updates.',
    disableBeacon: true,
  },
  {
    target: '.revenue-chart',
    content: 'Track your revenue trends over time with this interactive chart.',
  },
  {
    target: '.traffic-chart',
    content: 'See the breakdown of your traffic sources in this donut chart.',
  },
  {
    target: '.campaign-table',
    content: 'Manage and analyze all your campaigns in this detailed table. You can sort, filter, and export data.',
  },
  {
    target: '.theme-toggle',
    content: 'Switch between light and dark themes to match your preference.',
  },
  {
    target: '.export-button',
    content: 'Export your data as CSV or PDF reports for external analysis.',
  }
];

export function OnboardingTour({ run, onComplete }: OnboardingTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, action, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      onComplete();
    }

    if (type === 'step:after') {
      setCurrentStepIndex(index + 1);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          primaryColor: 'hsl(var(--primary))',
          backgroundColor: 'hsl(var(--card))',
          textColor: 'hsl(var(--foreground))',
          arrowColor: 'hsl(var(--card))',
          overlayColor: 'rgba(0, 0, 0, 0.4)',
        },
        tooltip: {
          borderRadius: 'var(--radius)',
          fontSize: '14px',
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          borderRadius: 'var(--radius)',
          border: 'none',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        buttonBack: {
          color: 'hsl(var(--muted-foreground))',
          marginRight: '10px',
        },
        buttonSkip: {
          color: 'hsl(var(--muted-foreground))',
        }
      }}
    />
  );
}