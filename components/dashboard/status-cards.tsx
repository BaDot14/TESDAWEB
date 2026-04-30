'use client';

interface StatusCard {
  label: string;
  value: number;
  gradient: string;
  textColor: string;
}

interface StatusCardsProps {
  activeTrainingCenters: number;
  totalPrograms: number;
  totalTrainers: number;
}

export function StatusCards({
  activeTrainingCenters,
  totalPrograms,
  totalTrainers,
}: StatusCardsProps) {
  const cards: StatusCard[] = [
    {
      label: 'Active Training Centers',
      value: activeTrainingCenters,
      gradient: 'linear-gradient(135deg, #3b82f6, #1e40af)',
      textColor: 'text-white',
    },
    {
      label: 'Total Programs',
      value: totalPrograms,
      gradient: 'linear-gradient(135deg, #60a5fa, #2563eb)',
      textColor: 'text-white',
    },
    {
      label: 'Total Trainers',
      value: totalTrainers,
      gradient: 'linear-gradient(135deg, #10b981, #047857)',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-3xl p-8 shadow-md text-left"
          style={{ background: card.gradient }}
        >
          <div className="flex flex-col gap-4">
            <p className={`${card.textColor} text-sm font-medium opacity-90`}>
              {card.label}
            </p>
            <p className={`${card.textColor} text-4xl font-bold`}>
              {card.value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
