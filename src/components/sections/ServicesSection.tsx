const services = [
  {
    title: "Website Migration",
    tags: ["Web Migration", "Optimization", "Framer Rebuild"]
  },
  {
    title: "Framer Templates",
    tags: ["Startup", "Agency", "SaaS"]
  },
  {
    title: "Frontend Development",
    tags: ["UI Dev", "Responsive Layouts", "Web Performance"]
  },
  {
    title: "Product Consulting",
    tags: ["Product Direction", "Web Strategy", "Technical Guidance"]
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 px-6 bg-transparent text-[#111111]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16">Services</h2>
        
        <div className="flex flex-col">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-[#dddddd] last:border-0 hover:bg-black/5 transition-colors cursor-default"
            >
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 md:mb-0">
                {service.title}
              </h3>
              <div className="text-sm font-medium text-[#888888] tracking-tight">
                {service.tags.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
