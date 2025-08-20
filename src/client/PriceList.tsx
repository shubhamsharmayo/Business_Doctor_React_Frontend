import PriceCard from "@/components/PriceCard";

const PriceList = () => {
  return (
    <div>
      <div className="w-[100vw] flex flex items-start p-4  gap-5 h-[100vh] border border-white">
        <PriceCard
          title="Basic"
          price={100}
          originalPrice={150}
          features={["50 users", "Unlimited projects", "24/7 support"]}
          isPopular={false}
          onSelect={() => console.log("Basic")}
        />
        <PriceCard
          title="Pro Plan"
          price={250}
          originalPrice={300}
          features={["50 users", "Unlimited projects", "24/7 support"]}
          isPopular={true}
          onSelect={() => console.log("Pro")}
        />
      </div>
    </div>
  );
};

export default PriceList;
