// components/CardSection.tsx

interface CardSectionProps {
    title: string;
    subtitle: string;
    currentPrice: string;
    quantity: number;
  }
  
  const CardSection: React.FC<CardSectionProps> = ({
    title,
    subtitle,
    currentPrice,
    quantity,
  }) => {
    return (
      <div className="w-full flex flex-col gap-4">
        <div>
          <h2 className="font-bold text-fluid-md">{title}</h2>
          <p className="font-bold text-fluid-md">{subtitle}</p>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-[80%] justify-center w-full h-10 sm:h-12 rounded-full">
          <div className="bg-[#4D3B3B] flex items-center justify-center rounded-full">
            <span>{quantity}</span>
          </div>
          <div className="col-span-2 flex items-center justify-center bg-[#4D3B3B] rounded-full">
            {currentPrice} STX
          </div>
          <div className="bg-[#4D3B3B] flex items-center justify-center rounded-full">
            <button className="px-2 py-1 text-xs sm:text-sm">Save</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardSection;