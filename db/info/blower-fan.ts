import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Blower Fan.docx". */

const description =
  "A blower fan is a mechanical device that moves air or gas from one place to another. It uses a rotating impeller, driven by an electric motor, to push air through a duct, pipe, or ventilation system.";

const applications = [
  "Industrial ventilation",
  "Combustion systems",
  "Wastewater treatment",
  "Drying processes",
  "Dust collection",
];

export const blowerFanProducts = [
  infoProduct({
    name: "Blower Fan",
    category: "Blower Fans",
    subtitle: "Blower Fan",
    description,
    features: applications,
    specs: { Type: "Blower Fan" },
    imagePath: "/products/blower-fan/blower-fan.webp",
    galleryImages: ["/blower-fan/support/20260319_085426.jpg", "/blower-fan/support/DSC05076.jpg", "/blower-fan/support/20220316_115450.jpg", "/blower-fan/support/20250317_153016.jpg"],
  }),
];

export const blowerFanInfo: ProductInfo = {
  path: "/blower-fan",
  title: "Blower Fan",
  description,
  productGroups: [
    {
      products: blowerFanProducts,
      photos: [
        "/blower-fan/support/20260319_085426.jpg",
        "/blower-fan/support/20260319_085436.jpg",
        "/blower-fan/support/20260319_085442.jpg",
        "/blower-fan/support/DSC04225.jpg",
        "/blower-fan/support/DSC05076.jpg",
        "/blower-fan/support/DSC05209.jpg",
        "/blower-fan/support/DSC05246.jpg",
        "/blower-fan/support/DSC05251.jpg",
        "/blower-fan/support/DSC05517.jpg",
        "/blower-fan/support/DSC08025.jpg",
        "/blower-fan/support/20220316_112748.jpg",
        "/blower-fan/support/20220316_112846.jpg",
        "/blower-fan/support/20220316_113012.jpg",
        "/blower-fan/support/20220316_113020.jpg",
        "/blower-fan/support/20220316_113037.jpg",
        "/blower-fan/support/20220316_115403.jpg",
        "/blower-fan/support/20220316_115433.jpg",
        "/blower-fan/support/20220316_115450.jpg",
        "/blower-fan/support/20220316_115504.jpg",
        "/blower-fan/support/20220316_115726.jpg",
        "/blower-fan/support/20220414_145310.jpg",
        "/blower-fan/support/20220414_145329.jpg",
        "/blower-fan/support/20220418_141111.jpg",
        "/blower-fan/support/20220418_141120.jpg",
        "/blower-fan/support/20220623_163532.jpg",
        "/blower-fan/support/20250306_133357.jpg",
        "/blower-fan/support/20250306_133424.jpg",
        "/blower-fan/support/20250317_153016.jpg",
        "/blower-fan/support/20250317_153030.jpg",
        "/blower-fan/support/20251009_141640.jpg",
      ],
    },
  ],
  sections: [
    {
      kind: "text",
      paragraphs: [
        "In simple words, a blower fan uses an electric motor to move air for ventilation, cooling, drying, or industrial processes.",
      ],
    },
    {
      kind: "groups",
      eyebrow: "Main parts of a blower fan",
      groups: [
        { title: "Electric motor", items: ["Provides the power needed to rotate the blower's impeller."] },
        { title: "Impeller", items: ["A rotating wheel with blades that transfers energy to the air and makes it move."] },
        { title: "Casing or housing", items: ["Surrounds the impeller and guides the airflow toward the outlet."] },
        { title: "Shaft and bearings", items: ["The shaft transmits rotation to the impeller, while the bearings support the rotating shaft and help it turn smoothly."] },
      ],
    },
    {
      kind: "groups",
      eyebrow: "Applications of blower fans",
      groups: [
        { title: "Industrial ventilation", items: ["Removes hot air, smoke, dust, and unwanted fumes when used with suitable extraction systems."] },
        { title: "Combustion systems", items: ["Supplies air to boilers, furnaces, and burners to support combustion."] },
        { title: "Wastewater treatment", items: ["Supplies air to aeration tanks to support microorganisms that break down organic waste."] },
        { title: "Drying processes", items: ["Moves warm or ambient air over products to help remove moisture."] },
        { title: "Dust collection", items: ["Creates airflow to carry dust toward filters or dust collectors."] },
      ],
    },
    {
      kind: "groups",
      eyebrow: "Applications of Blower Fans",
      intro: [
        "A blower fan is a machine that moves air or gas to provide ventilation, cooling, drying, combustion air, or industrial process airflow. It is usually powered by an electric motor.",
      ],
      subheading: "Common industrial applications",
      groups: [
        { title: "Industrial ventilation", items: ["Removes hot air from factories.", "Supplies fresh air to work areas.", "Extracts fumes and unwanted gases using suitable ventilation systems."] },
        { title: "Wastewater treatment", items: ["Supplies air to aeration tanks.", "Provides oxygen for microorganisms.", "Supports biological wastewater treatment."] },
        { title: "Dust collection systems", items: ["Moves dusty air toward filters.", "Supports extraction from grinding and cutting machines.", "Helps maintain cleaner working areas."] },
        { title: "Boilers and furnaces", items: ["Supplies combustion air to burners.", "Helps maintain the required airflow for combustion.", "Supports industrial heating processes."] },
        { title: "Drying systems", items: ["Circulates air in drying ovens.", "Helps remove moisture from products.", "Used in food, textile, paper, and manufacturing processes."] },
        { title: "Cooling systems", items: ["Moves air through heat exchangers.", "Helps remove heat from machinery.", "Supports cooling in industrial equipment and HVAC systems."] },
        { title: "Pneumatic conveying", items: ["Moves powders and granules through pipelines.", "Transfers materials such as flour, plastic pellets, and cement powder.", "Used in factories and material-handling systems."] },
      ],
    },
  ],
};
