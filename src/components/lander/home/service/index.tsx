import { SERVICES } from "./service.data";

const Service = () => {
  return (
    <section className="section lg:!mt-[-60px]">
      <div className="main-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-4 bg-[#232323] rounded-[20px] py-7"
          >
            <div className="text-[#F8C431] text-2xl">{service.icon}</div>
            <div className="ml-4">
              <h3 className="text-[14px] font-bold text-white font-inter leading-[15px]">
                {service.title}
              </h3>
              {service?.description && (
                <p className="text-[12px] leading-[18px] text-white/70">
                  {service?.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
