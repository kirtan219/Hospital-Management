// Medicine recommendation data based on common symptoms
const medicineData = [
  {
    symptom: "fever",
    medicines: ["Paracetamol", "Ibuprofen", "Acetaminophen"],
    dosage: "Adults: 500-1000mg every 4-6 hours as needed (max 4g/day)",
    warning: "If fever persists for more than 3 days or exceeds 39°C (102°F), consult a doctor immediately",
    description: "Fever is a temporary increase in body temperature, often due to an illness. Taking the recommended dose of fever reducer and staying hydrated can help manage symptoms."
  },
  {
    symptom: "headache",
    medicines: ["Aspirin", "Ibuprofen", "Paracetamol"],
    dosage: "Aspirin/Ibuprofen: 200-400mg every 4-6 hours as needed",
    warning: "For severe, sudden, or unusual headaches, seek medical advice. Avoid aspirin for children under 16.",
    description: "Headaches can be caused by stress, dehydration, lack of sleep, or underlying conditions. Rest, hydration, and over-the-counter pain relievers often help."
  },
  {
    symptom: "cold",
    medicines: ["Cetrizine", "Chlorpheniramine", "Loratadine", "Pseudoephedrine"],
    dosage: "Follow specific medication packaging instructions, typically once or twice daily",
    warning: "May cause drowsiness. Avoid driving or operating machinery. Not suitable for those with certain heart conditions.",
    description: "Common colds are viral infections affecting the upper respiratory tract. Symptoms include runny nose, congestion, sneezing, and mild fever."
  },
  {
    symptom: "cough",
    medicines: ["Dextromethorphan", "Guaifenesin", "Benzonatate", "Honey & lemon"],
    dosage: "As prescribed or directed on packaging. For natural remedies: 1 tbsp honey in warm water.",
    warning: "If cough persists for more than a week or is accompanied by high fever, seek medical advice.",
    description: "Coughs can be dry or productive (with phlegm). Dry coughs may benefit from cough suppressants, while productive coughs might need expectorants to help clear mucus."
  },
  {
    symptom: "sore throat",
    medicines: ["Strepsils", "Chloraseptic spray", "Benzocaine lozenges", "Salt water gargle"],
    dosage: "Lozenges: 1 every 2-3 hours as needed. Gargle: ½ tsp salt in warm water, several times daily.",
    warning: "If throat pain is severe, lasts more than a week, or is accompanied by difficulty swallowing, consult a doctor.",
    description: "Sore throats are often caused by viral infections but can sometimes indicate bacterial infections like strep throat, which requires antibiotics."
  },
  {
    symptom: "allergies",
    medicines: ["Loratadine", "Cetirizine", "Fexofenadine", "Nasal corticosteroids"],
    dosage: "Antihistamines: typically once daily. Nasal sprays: as directed, usually 1-2 sprays per nostril daily.",
    warning: "Some antihistamines may cause drowsiness. Persistent or severe allergic reactions require medical attention.",
    description: "Allergies occur when your immune system reacts to foreign substances. Common triggers include pollen, dust mites, pet dander, and certain foods."
  },
  {
    symptom: "stomach pain",
    medicines: ["Omeprazole", "Ranitidine", "Antacids", "Simethicone"],
    dosage: "Antacids: as needed for immediate relief. Acid reducers: as directed, typically before meals.",
    warning: "If pain is severe, persistent, or accompanied by vomiting blood, seek immediate medical attention.",
    description: "Stomach pain can result from indigestion, gas, gastritis, or more serious conditions. Mild cases often respond to over-the-counter medications and dietary changes."
  },
  {
    symptom: "diarrhea",
    medicines: ["Loperamide", "Bismuth subsalicylate", "Oral rehydration solutions"],
    dosage: "Follow package directions. Rehydration: drink small amounts frequently throughout the day.",
    warning: "Stay hydrated. Seek medical help if symptoms persist beyond 2 days, contain blood, or are accompanied by high fever.",
    description: "Diarrhea is often caused by viral infections, food poisoning, or medication side effects. Hydration is crucial during episodes of diarrhea."
  },
  {
    symptom: "nausea",
    medicines: ["Ondansetron", "Dimenhydrinate", "Ginger supplements", "Peppermint tea"],
    dosage: "Prescription medications: as directed. Natural remedies: ginger 250mg capsules or 1 cup peppermint tea as needed.",
    warning: "For severe or persistent nausea, especially when accompanied by vomiting for more than 24 hours, consult a healthcare provider.",
    description: "Nausea can be caused by motion sickness, food poisoning, medication side effects, pregnancy, or underlying medical conditions."
  },
  {
    symptom: "muscle pain",
    medicines: ["Ibuprofen", "Naproxen", "Topical analgesics", "Acetaminophen"],
    dosage: "Oral medications: as directed on packaging. Topical treatments: apply to affected area 3-4 times daily.",
    warning: "If pain is severe, persistent, or accompanied by swelling or inability to move the affected area, seek medical attention.",
    description: "Muscle pain often results from overuse, injury, tension, or certain medical conditions. Rest, gentle stretching, and anti-inflammatory medications can help."
  },
  {
    symptom: "insomnia",
    medicines: ["Melatonin", "Diphenhydramine", "Valerian root"],
    dosage: "Melatonin: 1-5mg before bedtime. Herbal supplements: as directed on packaging.",
    warning: "Chronic insomnia should be evaluated by a healthcare provider. Avoid alcohol and caffeine before bedtime.",
    description: "Insomnia can be caused by stress, anxiety, poor sleep habits, or certain medications. Establishing a regular sleep schedule and bedtime routine may help."
  },
  {
    symptom: "constipation",
    medicines: ["Psyllium husk", "Docusate sodium", "Milk of magnesia"],
    dosage: "Fiber supplements: 1-2 tablespoons daily with plenty of water. Laxatives: as directed on packaging.",
    warning: "If constipation persists for more than 2 weeks or is accompanied by severe pain or bleeding, consult a doctor.",
    description: "Constipation is often caused by insufficient fiber or fluid intake, certain medications, or lack of physical activity. Increasing dietary fiber and staying hydrated can help."
  },
  // Infectious Diseases
  {
    symptom: "flu",
    medicines: ["Oseltamivir (Tamiflu)", "Paracetamol", "Ibuprofen", "Decongestants"],
    dosage: "Antiviral medications: as prescribed by doctor. Painkillers: as directed on packaging.",
    warning: "Consult a doctor if symptoms are severe, not improving after 7 days, or if you have underlying health conditions.",
    description: "Influenza (flu) is a viral infection that attacks your respiratory system. Antiviral medications work best when started within 48 hours of symptoms."
  },
  {
    symptom: "covid-19",
    medicines: ["Paracetamol", "Ibuprofen", "Home isolation", "Plenty of fluids"],
    dosage: "Paracetamol: 500-1000mg every 4-6 hours as needed (max 4g/day).",
    warning: "Seek immediate medical attention if experiencing difficulty breathing, persistent chest pain, new confusion, or bluish lips/face.",
    description: "COVID-19 is caused by the SARS-CoV-2 virus. Most cases can be managed at home, but severe cases require hospitalization. Follow current CDC guidelines."
  },
  {
    symptom: "chickenpox",
    medicines: ["Calamine lotion", "Antihistamines", "Paracetamol", "Cool baths with baking soda"],
    dosage: "Calamine: apply to affected areas as needed. Antihistamines: as directed to relieve itching.",
    warning: "Do not use aspirin due to risk of Reye's syndrome. Seek medical care if severe symptoms develop or for high-risk individuals.",
    description: "Chickenpox is a highly contagious viral infection causing an itchy rash with fluid-filled blisters. Most cases resolve within 1-2 weeks."
  },
  {
    symptom: "measles",
    medicines: ["Vitamin A supplements", "Paracetamol", "Ibuprofen", "Rest and fluids"],
    dosage: "Vitamin A: as prescribed by doctor. Fever reducers: as directed on packaging.",
    warning: "Measles can be serious; complications may include pneumonia and encephalitis. Contact healthcare provider immediately upon suspicion of measles.",
    description: "Measles is a highly contagious viral disease marked by fever, cough, runny nose, and a characteristic red rash. Vaccination is the best prevention."
  },
  {
    symptom: "mumps",
    medicines: ["Paracetamol", "Ibuprofen", "Cold compresses", "Soft foods"],
    dosage: "Pain relievers: as directed on packaging.",
    warning: "Complications can include inflammation of testicles, ovaries, pancreas, or brain. Consult doctor if severe symptoms develop.",
    description: "Mumps is a viral infection that primarily affects the salivary glands, causing painful swelling. Most recover completely in a few weeks."
  },
  {
    symptom: "dengue fever",
    medicines: ["Paracetamol", "Fluids", "Rest"],
    dosage: "Paracetamol: as directed. Avoid aspirin and NSAIDs due to bleeding risk.",
    warning: "Seek immediate medical attention if experiencing severe abdominal pain, persistent vomiting, bleeding, or difficulty breathing.",
    description: "Dengue is a mosquito-borne viral infection causing high fever, severe headache, and joint/muscle pain. No specific antiviral treatment exists."
  },
  {
    symptom: "malaria",
    medicines: ["Chloroquine", "Artemisinin-based combination therapies", "Atovaquone-proguanil"],
    dosage: "Anti-malarial medications: strictly as prescribed by healthcare provider.",
    warning: "Requires prompt medical diagnosis and treatment. Severe cases can be life-threatening if not treated properly.",
    description: "Malaria is a mosquito-borne disease caused by parasites, characterized by cycles of fever, chills, and sweating. Prevention includes antimalarial drugs and avoiding mosquito bites."
  },
  {
    symptom: "tuberculosis",
    medicines: ["Isoniazid", "Rifampin", "Ethambutol", "Pyrazinamide"],
    dosage: "Multiple antibiotics taken simultaneously as prescribed for 6-9 months.",
    warning: "Treatment must be completed as prescribed. Stopping early can lead to drug resistance. Regular medical follow-up required.",
    description: "Tuberculosis (TB) is a bacterial infection primarily affecting the lungs. It requires long-term treatment with multiple antibiotics."
  },
  {
    symptom: "typhoid",
    medicines: ["Ciprofloxacin", "Azithromycin", "Ceftriaxone", "Fluids and rest"],
    dosage: "Antibiotics: as prescribed by doctor, typically for 7-14 days.",
    warning: "Complete the full course of antibiotics. Without treatment, typhoid can be life-threatening.",
    description: "Typhoid fever is a bacterial infection spread through contaminated food or water, causing high fever, abdominal pain, and constipation or diarrhea."
  },
  {
    symptom: "hepatitis a",
    medicines: ["Rest", "Adequate nutrition", "Fluids", "Avoid alcohol"],
    dosage: "Supportive care only; no specific medications.",
    warning: "Highly contagious. Practice good hygiene. Seek medical attention if symptoms worsen or jaundice develops.",
    description: "Hepatitis A is a viral liver infection spread through contaminated food/water or close contact. Most recover completely and develop immunity."
  },
  {
    symptom: "hepatitis b",
    medicines: ["Entecavir", "Tenofovir", "Lamivudine", "Interferon alfa"],
    dosage: "Antiviral medications: as prescribed by specialist.",
    warning: "Chronic cases require long-term monitoring for liver damage. Regular follow-up with hepatologist recommended.",
    description: "Hepatitis B is a viral infection attacking the liver, which can cause both acute and chronic disease. Vaccination is available for prevention."
  },
  {
    symptom: "hepatitis c",
    medicines: ["Direct-acting antivirals (DAAs)", "Sofosbuvir", "Ledipasvir", "Daclatasvir"],
    dosage: "Antiviral medications: as prescribed, typically for 8-12 weeks.",
    warning: "Treatment can cure over 95% of cases, but requires strict adherence. Specialist care is essential.",
    description: "Hepatitis C is a viral infection causing liver inflammation, often leading to serious liver damage if untreated. Current treatments are highly effective."
  },
  {
    symptom: "pneumonia",
    medicines: ["Amoxicillin", "Azithromycin", "Levofloxacin", "Paracetamol"],
    dosage: "Antibiotics: complete prescribed course (typically 5-7 days). Fever reducers: as directed.",
    warning: "Seek medical attention if breathing difficulties worsen, chest pain increases, or high fever persists.",
    description: "Pneumonia is an infection causing inflammation in the air sacs of one or both lungs. Bacterial pneumonia requires antibiotics, while viral cases focus on supportive care."
  },
  {
    symptom: "strep throat",
    medicines: ["Penicillin", "Amoxicillin", "Cephalexin", "Throat lozenges"],
    dosage: "Antibiotics: complete full course as prescribed (usually 10 days).",
    warning: "Complete entire antibiotic course even if symptoms improve. Untreated strep can lead to rheumatic fever.",
    description: "Strep throat is a bacterial infection causing sore throat, pain with swallowing, and fever. Diagnosis requires a throat swab test."
  },
  {
    symptom: "tonsillitis",
    medicines: ["Penicillin", "Amoxicillin", "Paracetamol", "Ibuprofen", "Salt water gargles"],
    dosage: "Antibiotics: if bacterial, complete full course. Pain relievers: as directed.",
    warning: "If breathing becomes difficult or swallowing is severely painful, seek immediate medical attention.",
    description: "Tonsillitis is inflammation of the tonsils, usually due to viral or bacterial infection. Recurrent cases may require surgical removal (tonsillectomy)."
  },
  {
    symptom: "ear infection",
    medicines: ["Amoxicillin", "Amoxicillin-clavulanate", "Paracetamol", "Ibuprofen"],
    dosage: "Antibiotics: as prescribed. Pain relievers: according to package directions.",
    warning: "Watch for worsening symptoms, fever over 102.2°F, severe ear pain, or discharge from the ear.",
    description: "Ear infections involve inflammation and fluid buildup in the middle ear. Children are more prone to these infections than adults."
  },
  {
    symptom: "sinus infection",
    medicines: ["Amoxicillin", "Doxycycline", "Nasal saline spray", "Decongestants"],
    dosage: "Antibiotics: as prescribed for bacterial infections. Decongestants: as directed, typically not more than 3 days.",
    warning: "If symptoms worsen or persist beyond 10 days, or if you have severe pain or high fever, consult a doctor.",
    description: "Sinusitis is inflammation of the sinuses, often following a cold. Most cases are viral and resolve without antibiotics."
  },
  {
    symptom: "urinary tract infection",
    medicines: ["Trimethoprim-sulfamethoxazole", "Nitrofurantoin", "Ciprofloxacin", "Plenty of water"],
    dosage: "Antibiotics: complete full course as prescribed, typically 3-7 days.",
    warning: "Complete entire antibiotic course. If symptoms worsen or include fever, back pain, or blood in urine, seek immediate care.",
    description: "UTIs are common infections affecting the urinary system. Women are more susceptible than men. Prompt treatment prevents spread to kidneys."
  },
  {
    symptom: "gastroenteritis",
    medicines: ["Oral rehydration solutions", "Probiotics", "Loperamide (for adults)", "Bismuth subsalicylate"],
    dosage: "Rehydration: drink small amounts frequently. Anti-diarrheals: as directed, not for children.",
    warning: "Rehydration is crucial. Seek medical attention if unable to keep fluids down, symptoms persist beyond 2 days, or severe dehydration develops.",
    description: "Gastroenteritis (stomach flu) is inflammation of the stomach and intestines, typically caused by viruses, bacteria, or parasites."
  },
  {
    symptom: "conjunctivitis",
    medicines: ["Artificial tears", "Antibiotic eye drops (bacterial)", "Cold compresses"],
    dosage: "Eye drops: as directed, typically 1-2 drops 4-6 times daily.",
    warning: "Highly contagious. Avoid touching eyes and sharing towels. See doctor if pain, light sensitivity, or vision problems develop.",
    description: "Conjunctivitis (pink eye) is inflammation of the conjunctiva, often due to infection or allergies. Most cases resolve within 7-14 days."
  },
  {
    symptom: "ringworm",
    medicines: ["Clotrimazole cream", "Miconazole cream", "Terbinafine cream", "Ketoconazole shampoo (scalp)"],
    dosage: "Antifungal creams: apply to affected area 2-3 times daily for 2-4 weeks.",
    warning: "Continue treatment for full prescribed duration even if symptoms improve. If no improvement after 2 weeks, see doctor.",
    description: "Ringworm is a fungal infection of the skin, not caused by worms. It's contagious through direct contact with infected people, animals, or objects."
  },
  {
    symptom: "athlete's foot",
    medicines: ["Clotrimazole cream", "Miconazole powder", "Terbinafine spray", "Tolnaftate solution"],
    dosage: "Antifungal products: apply to affected area as directed, typically 1-2 times daily for 1-4 weeks.",
    warning: "Keep feet dry. Complete full treatment course. If infection spreads or doesn't improve after 2 weeks, consult a doctor.",
    description: "Athlete's foot is a fungal infection causing itchy, scaly rash between toes or on soles. It thrives in warm, moist environments like swimming pools and showers."
  },
  {
    symptom: "scabies",
    medicines: ["Permethrin cream", "Ivermectin (oral)", "Antihistamines for itching"],
    dosage: "Permethrin: apply from neck down, leave on for 8-14 hours, then wash off. Repeat after 7 days.",
    warning: "Treat all household contacts simultaneously. Wash all bedding and clothing in hot water. Itching may persist for weeks after treatment.",
    description: "Scabies is a skin infestation by the mite Sarcoptes scabiei, causing intense itching and a pimple-like rash. It spreads through prolonged skin-to-skin contact."
  },
  // Digestive Disorders
  {
    symptom: "indigestion",
    medicines: ["Antacids", "H2 blockers (Famotidine)", "Proton pump inhibitors (Omeprazole)", "Simethicone"],
    dosage: "Antacids: as needed for immediate relief. H2 blockers/PPIs: as directed, typically before meals.",
    warning: "If symptoms persist more than 2 weeks or are accompanied by weight loss, difficulty swallowing, or black stools, see a doctor promptly.",
    description: "Indigestion (dyspepsia) involves discomfort in the upper abdomen, often after eating. It can be caused by eating too quickly, fatty foods, or underlying conditions."
  },
  {
    symptom: "gastritis",
    medicines: ["Antacids", "Proton pump inhibitors", "H2 blockers", "Probiotics"],
    dosage: "PPIs/H2 blockers: as prescribed, typically once or twice daily before meals.",
    warning: "Seek immediate medical attention if experiencing severe pain, vomiting blood, or black/tarry stools.",
    description: "Gastritis is inflammation of the stomach lining, which can be acute or chronic. Common causes include H. pylori infection, NSAIDs, alcohol, or stress."
  },
  {
    symptom: "acid reflux",
    medicines: ["Antacids", "Proton pump inhibitors", "H2 blockers", "Alginate-based products"],
    dosage: "PPIs: typically once daily before breakfast. H2 blockers: as directed, usually twice daily.",
    warning: "Chronic acid reflux (GERD) can damage the esophagus. See a doctor if symptoms persist despite medication or lifestyle changes.",
    description: "Acid reflux occurs when stomach acid flows back into the esophagus, causing heartburn. Lifestyle modifications like avoiding trigger foods and not lying down after eating can help."
  },
  {
    symptom: "peptic ulcer",
    medicines: ["Proton pump inhibitors", "H2 blockers", "Antibiotics (if H. pylori)", "Bismuth subsalicylate"],
    dosage: "Multiple medications as prescribed, typically for 2-4 weeks. Antibiotics: usually 10-14 days.",
    warning: "Complete full treatment course. Avoid NSAIDs, alcohol, and smoking. Seek immediate care for severe pain, vomiting blood, or black stools.",
    description: "Peptic ulcers are open sores on the inner lining of the stomach, upper small intestine, or esophagus. Most are caused by H. pylori bacteria or NSAID use."
  },
  {
    symptom: "bloating",
    medicines: ["Simethicone", "Activated charcoal", "Digestive enzymes", "Peppermint oil capsules"],
    dosage: "Simethicone: as directed with meals. Peppermint oil: typically 1 capsule 2-3 times daily between meals.",
    warning: "If bloating is severe, persistent, or accompanied by weight loss, appetite changes, or blood in stool, consult a doctor.",
    description: "Bloating is a feeling of fullness or swelling in the abdomen. It can be caused by gas, digestive disorders, or hormonal changes."
  },
  {
    symptom: "irritable bowel syndrome",
    medicines: ["Fiber supplements", "Antispasmodics", "Peppermint oil", "Loperamide (for diarrhea)", "Laxatives (for constipation)"],
    dosage: "Varies by medication and symptom pattern. Follow healthcare provider directions.",
    warning: "IBS is a chronic condition requiring management. If symptoms change significantly or include weight loss, bleeding, or night symptoms, see a doctor.",
    description: "IBS is a common intestinal disorder causing abdominal pain, bloating, gas, diarrhea, and/or constipation. Symptoms vary between individuals and triggers may include stress and certain foods."
  },
  {
    symptom: "food poisoning",
    medicines: ["Oral rehydration solutions", "Bismuth subsalicylate", "Loperamide (adults only)", "Probiotics"],
    dosage: "Rehydration: drink small amounts frequently. Anti-diarrheals: as directed, not for bloody diarrhea.",
    warning: "Seek medical attention for high fever, blood in stool, severe abdominal pain, signs of dehydration, or symptoms lasting more than 3 days.",
    description: "Food poisoning results from consuming contaminated food or water. Symptoms include nausea, vomiting, diarrhea, and abdominal pain, usually beginning within hours of exposure."
  },
  // Respiratory Conditions
  {
    symptom: "dry cough",
    medicines: ["Dextromethorphan", "Benzonatate", "Codeine (prescription)", "Honey (for adults and children over 1)"],
    dosage: "Cough suppressants: as directed on packaging. Honey: 1-2 teaspoons as needed.",
    warning: "If cough persists more than 2 weeks, produces thick green/yellow phlegm, or is accompanied by fever, seek medical advice.",
    description: "A dry cough doesn't produce phlegm and is often caused by viral infections, allergies, or irritants. Suppressants can help control the cough reflex."
  },
  {
    symptom: "wet cough",
    medicines: ["Guaifenesin", "N-acetylcysteine", "Ambroxol", "Steam inhalation"],
    dosage: "Expectorants: as directed on packaging. Steam: inhale for 10-15 minutes, 2-4 times daily.",
    warning: "If cough produces blood or thick, green/yellow phlegm, or is accompanied by chest pain or difficulty breathing, consult a doctor.",
    description: "A wet or productive cough brings up mucus/phlegm from the lungs. Expectorants help loosen mucus, making it easier to cough up and clear airways."
  },
  {
    symptom: "allergic rhinitis",
    medicines: ["Antihistamines", "Nasal corticosteroids", "Nasal saline sprays", "Decongestants (short-term)"],
    dosage: "Antihistamines: as directed, typically once daily. Nasal sprays: usually 1-2 sprays per nostril daily.",
    warning: "Don't use decongestants for more than 3 days. If symptoms include wheezing or difficulty breathing, seek immediate medical attention.",
    description: "Allergic rhinitis (hay fever) causes sneezing, runny nose, and itchy eyes due to allergen exposure. Identifying and avoiding triggers is key to management."
  },
  {
    symptom: "sinusitis",
    medicines: ["Saline nasal irrigation", "Intranasal corticosteroids", "Decongestants", "Antibiotics (if bacterial)"],
    dosage: "Nasal irrigation: 1-3 times daily. Antibiotics: complete full course as prescribed.",
    warning: "If symptoms worsen after 7 days or include severe headache, facial swelling, or vision changes, consult a doctor promptly.",
    description: "Sinusitis is inflammation of the sinuses, causing pain/pressure, congestion, and thick nasal discharge. Most cases are viral and don't require antibiotics."
  },
  // Chronic/Non-Communicable Diseases
  {
    symptom: "asthma",
    medicines: ["Albuterol inhaler", "Corticosteroid inhalers", "Leukotriene modifiers", "Combination inhalers"],
    dosage: "Rescue inhalers (albuterol): as needed. Controller medications: daily as prescribed.",
    warning: "Seek emergency care if experiencing severe shortness of breath not relieved by rescue inhaler, bluish lips/face, or difficulty speaking.",
    description: "Asthma is a chronic condition causing airway inflammation and narrowing, leading to breathing difficulty. A personalized asthma action plan is essential."
  },
  {
    symptom: "diabetes type 1",
    medicines: ["Insulin (various types)", "Glucagon emergency kit", "Regular blood glucose monitoring"],
    dosage: "Insulin: strictly as prescribed and adjusted based on blood glucose levels, food intake, and activity.",
    warning: "Requires lifelong insulin therapy and careful monitoring. Seek immediate care for signs of extremely high/low blood sugar.",
    description: "Type 1 diabetes is an autoimmune condition where the pancreas produces little or no insulin. Insulin therapy is essential for survival."
  },
  {
    symptom: "diabetes type 2",
    medicines: ["Metformin", "Sulfonylureas", "DPP-4 inhibitors", "SGLT2 inhibitors", "GLP-1 receptor agonists", "Insulin"],
    dosage: "Oral medications/insulin: as prescribed by healthcare provider. Follow medication schedule carefully.",
    warning: "Regular monitoring of blood glucose is essential. Seek medical attention for persistent very high/low blood sugar levels.",
    description: "Type 2 diabetes occurs when cells become resistant to insulin or the pancreas doesn't produce enough. Management includes medication, diet, and exercise."
  },
  {
    symptom: "hypertension",
    medicines: ["ACE inhibitors", "ARBs", "Calcium channel blockers", "Diuretics", "Beta-blockers"],
    dosage: "Antihypertensives: as prescribed, typically once or twice daily.",
    warning: "Don't stop medication without consulting doctor. Seek immediate care if blood pressure is dangerously high or experiencing severe headache, vision problems, or chest pain.",
    description: "Hypertension (high blood pressure) often has no symptoms but can lead to serious health problems. Regular monitoring and consistent medication are essential."
  },
  {
    symptom: "high cholesterol",
    medicines: ["Statins", "Cholesterol absorption inhibitors", "PCSK9 inhibitors", "Bile acid sequestrants"],
    dosage: "Lipid-lowering medications: as prescribed, typically once daily.",
    warning: "Report muscle pain, weakness, or brown urine to doctor immediately. Regular monitoring of cholesterol levels is important.",
    description: "High cholesterol increases risk of heart disease and stroke. Management includes medication, diet changes, and regular exercise."
  },
  {
    symptom: "hypothyroidism",
    medicines: ["Levothyroxine", "Liothyronine"],
    dosage: "Thyroid hormone replacement: typically once daily on empty stomach.",
    warning: "Take consistently same time each day. Regular monitoring of thyroid levels required for dose adjustments.",
    description: "Hypothyroidism occurs when the thyroid doesn't produce enough hormones. Symptoms include fatigue, weight gain, and cold intolerance."
  },
  {
    symptom: "hyperthyroidism",
    medicines: ["Beta-blockers", "Antithyroid medications (Methimazole, Propylthiouracil)", "Radioactive iodine"],
    dosage: "Medications: strictly as prescribed by endocrinologist.",
    warning: "Report sore throat, fever, unusual bleeding/bruising, or yellowing of skin/eyes to doctor immediately.",
    description: "Hyperthyroidism occurs when the thyroid produces excess hormones. Symptoms include weight loss, rapid heartbeat, and heat intolerance."
  },
  {
    symptom: "anemia",
    medicines: ["Iron supplements", "Vitamin B12", "Folic acid", "Erythropoietin (for severe cases)"],
    dosage: "Iron: typically 1-3 tablets daily with food. Vitamin supplements: as directed by doctor.",
    warning: "Iron supplements may cause constipation or black stools. If symptoms worsen despite supplementation, consult doctor.",
    description: "Anemia is a condition where you don't have enough healthy red blood cells to carry adequate oxygen to tissues. Causes vary and determine treatment."
  },
  {
    symptom: "migraine",
    medicines: ["Triptans", "NSAIDs", "Anti-nausea medications", "Preventive medications (if frequent)"],
    dosage: "Acute treatments: at first sign of migraine. Preventives: daily as prescribed.",
    warning: "If experiencing 'worst headache of life,' sudden severe pain, fever, or neurological changes, seek emergency care.",
    description: "Migraines are severe, recurring headaches often accompanied by nausea, light sensitivity, and visual disturbances. Identifying triggers helps prevention."
  },
  {
    symptom: "chronic fatigue syndrome",
    medicines: ["Pain relievers", "Antidepressants (low dose)", "Sleep aids", "Cognitive behavioral therapy"],
    dosage: "Medications: as prescribed by healthcare provider. Therapy: regular sessions as recommended.",
    warning: "No specific cure exists. Focus on managing symptoms. Multiple approaches may be needed for improvement.",
    description: "Chronic fatigue syndrome (ME/CFS) causes extreme fatigue that doesn't improve with rest and worsens with physical/mental activity. Treatment is individualized."
  },
  {
    symptom: "arthritis",
    medicines: ["Acetaminophen", "NSAIDs", "Topical analgesics", "Corticosteroids", "DMARDs (for rheumatoid)"],
    dosage: "Pain relievers: as directed. Disease-modifying medications: strictly as prescribed.",
    warning: "Long-term NSAID use can cause stomach or kidney problems. Regular monitoring needed for certain medications.",
    description: "Arthritis causes joint inflammation with pain, stiffness, and reduced mobility. Osteoarthritis results from wear and tear, while rheumatoid arthritis is autoimmune."
  },
  {
    symptom: "psoriasis",
    medicines: ["Topical corticosteroids", "Vitamin D analogues", "Retinoids", "Biologics (severe cases)"],
    dosage: "Topicals: as directed, typically once or twice daily to affected areas.",
    warning: "Some treatments increase sun sensitivity. Biologics may increase infection risk. Follow up regularly with dermatologist.",
    description: "Psoriasis is an autoimmune condition causing rapid skin cell growth, resulting in thick, scaly patches. Treatment varies based on severity and type."
  },
  {
    symptom: "eczema",
    medicines: ["Topical corticosteroids", "Calcineurin inhibitors", "Antihistamines", "Moisturizers"],
    dosage: "Topicals: as directed to affected areas. Moisturize multiple times daily.",
    warning: "Avoid triggers. Prolonged steroid use may thin skin. If signs of skin infection develop, seek medical advice.",
    description: "Eczema (atopic dermatitis) causes dry, itchy, inflamed skin. Managing triggers and maintaining skin hydration are key aspects of treatment."
  },
  {
    symptom: "copd",
    medicines: ["Bronchodilators", "Inhaled corticosteroids", "Combination inhalers", "Oxygen therapy (advanced)"],
    dosage: "Inhalers: as prescribed, typically daily and/or as needed. Proper inhaler technique is essential.",
    warning: "Seek immediate care for sudden difficulty breathing, bluish lips/fingers, or confusion. Quit smoking to prevent progression.",
    description: "COPD (Chronic Obstructive Pulmonary Disease) causes breathing difficulty due to damaged airways and air sacs. It includes chronic bronchitis and emphysema."
  },
  {
    symptom: "chronic bronchitis",
    medicines: ["Bronchodilators", "Inhaled corticosteroids", "Mucolytics", "Antibiotics (for infections)"],
    dosage: "Inhalers: as prescribed. Antibiotics: complete full course during exacerbations.",
    warning: "If coughing increases significantly, produces blood, or if breathing becomes difficult, seek medical care promptly.",
    description: "Chronic bronchitis involves inflammation of bronchial tubes with persistent cough and mucus production for at least 3 months in 2 consecutive years."
  },
  {
    symptom: "epilepsy",
    medicines: ["Carbamazepine", "Valproic acid", "Lamotrigine", "Levetiracetam", "Phenytoin"],
    dosage: "Anticonvulsants: strictly as prescribed, typically 1-2 times daily.",
    warning: "Don't stop medication without doctor consultation. Seek emergency care for seizures lasting >5 minutes or multiple seizures without recovery between them.",
    description: "Epilepsy is a neurological disorder characterized by recurrent seizures. Medication can control seizures in most people with proper management."
  },
  {
    symptom: "heart disease",
    medicines: ["Antiplatelet agents", "Statins", "Beta-blockers", "ACE inhibitors", "Nitroglycerin"],
    dosage: "Medications: strictly as prescribed by cardiologist.",
    warning: "Seek immediate emergency care for chest pain, shortness of breath, fainting, or irregular heartbeat. Regular cardiac follow-up essential.",
    description: "Heart disease includes various conditions affecting heart function. Treatment aims to manage symptoms, prevent complications, and reduce further damage."
  },
  // Mental Health Disorders
  {
    symptom: "depression",
    medicines: ["SSRIs", "SNRIs", "Bupropion", "Tricyclic antidepressants", "Psychotherapy"],
    dosage: "Antidepressants: as prescribed, typically once daily. Full effect may take 4-6 weeks.",
    warning: "Don't stop medication suddenly. Report worsening depression, suicidal thoughts, or unusual behavior changes immediately. Therapy is often essential alongside medication.",
    description: "Depression is a mood disorder causing persistent sadness and loss of interest. Treatment typically combines medication and psychotherapy."
  },
  {
    symptom: "anxiety",
    medicines: ["SSRIs", "SNRIs", "Benzodiazepines (short-term)", "Buspirone", "Cognitive behavioral therapy"],
    dosage: "Antianxiety medications: as prescribed. Benzodiazepines: only as directed for short periods.",
    warning: "Benzodiazepines can be habit-forming. Don't stop medication abruptly. Regular therapy is recommended alongside medication.",
    description: "Anxiety disorders involve excessive worry or fear that interferes with daily activities. Treatment options include medication, therapy, and lifestyle changes."
  },
  {
    symptom: "panic attacks",
    medicines: ["SSRIs", "SNRIs", "Benzodiazepines", "Beta-blockers", "Cognitive behavioral therapy"],
    dosage: "Daily medications: as prescribed for prevention. Rescue medications: only during attacks as directed.",
    warning: "Learn to recognize early symptoms and use coping techniques. If attacks worsen or become more frequent despite treatment, contact your doctor.",
    description: "Panic attacks are sudden episodes of intense fear triggering severe physical reactions. They can occur without obvious cause and may feel like a heart attack."
  },
  {
    symptom: "insomnia",
    medicines: ["Melatonin", "Diphenhydramine", "Zolpidem", "Eszopiclone", "Cognitive behavioral therapy for insomnia"],
    dosage: "Sleep aids: as directed, typically 30 minutes before bedtime. CBT-I: regular sessions as recommended.",
    warning: "Sleep medications can cause dependence. Focus on sleep hygiene. Seek help if insomnia persists despite interventions.",
    description: "Insomnia involves difficulty falling or staying asleep. Short-term insomnia may not require treatment, while chronic insomnia often requires addressing underlying causes."
  },
  // Skin Conditions
  {
    symptom: "acne",
    medicines: ["Benzoyl peroxide", "Salicylic acid", "Topical retinoids", "Oral antibiotics", "Isotretinoin (severe)"],
    dosage: "Topicals: as directed, typically once or twice daily to affected areas.",
    warning: "Some treatments increase sun sensitivity. Isotretinoin requires strict monitoring due to potential serious side effects.",
    description: "Acne is a skin condition causing pimples, blackheads, and whiteheads when hair follicles become clogged with oil and dead skin cells."
  },
  {
    symptom: "dandruff",
    medicines: ["Zinc pyrithione shampoos", "Ketoconazole shampoos", "Selenium sulfide shampoos", "Coal tar products"],
    dosage: "Medicated shampoos: use 2-3 times weekly or as directed.",
    warning: "If scalp becomes irritated or condition worsens, consult a dermatologist. Some shampoos may discolor hair.",
    description: "Dandruff causes flaking of the scalp. It may be due to dry skin, skin conditions like seborrheic dermatitis, or fungal growth."
  },
  {
    symptom: "fungal infections",
    medicines: ["Clotrimazole", "Miconazole", "Terbinafine", "Fluconazole (oral)"],
    dosage: "Topical antifungals: apply to affected areas 1-2 times daily for 1-4 weeks.",
    warning: "Complete full treatment course even if symptoms improve. If infection spreads or doesn't improve, consult a doctor.",
    description: "Fungal skin infections include ringworm, athlete's foot, jock itch, and yeast infections. They thrive in warm, moist areas of the body."
  },
  {
    symptom: "rashes",
    medicines: ["Hydrocortisone cream", "Calamine lotion", "Antihistamines", "Moisturizers"],
    dosage: "Topical treatments: apply to affected areas as directed. Antihistamines: as needed for itching.",
    warning: "If rash covers large body area, develops blisters, occurs with fever, or spreads rapidly, seek medical attention.",
    description: "Rashes vary widely in appearance and cause. They may be due to allergies, infections, heat, medications, or underlying medical conditions."
  },
  {
    symptom: "sunburn",
    medicines: ["Aloe vera gel", "Hydrocortisone cream", "NSAIDs", "Cool compresses"],
    dosage: "Aloe vera: apply to affected areas several times daily. NSAIDs: as directed for pain and inflammation.",
    warning: "Seek medical attention for severe burns with blistering, fever, extreme pain, or signs of dehydration.",
    description: "Sunburn is skin damage from ultraviolet (UV) radiation. Prevention with sunscreen and protective clothing is best."
  },
  {
    symptom: "hives",
    medicines: ["Antihistamines", "Corticosteroids (severe cases)", "Epinephrine (for anaphylaxis)"],
    dosage: "Antihistamines: as directed, may need higher doses for urticaria than for allergies.",
    warning: "If hives occur with swelling of face/throat, difficulty breathing, or dizziness, seek emergency care immediately.",
    description: "Hives (urticaria) are itchy, raised welts triggered by allergens, stress, certain foods, medications, or unknown causes."
  },
  // Other Common Issues
  {
    symptom: "dehydration",
    medicines: ["Oral rehydration solutions", "Electrolyte drinks", "IV fluids (severe cases)"],
    dosage: "Rehydration: drink small amounts frequently. Follow package directions for oral rehydration salts.",
    warning: "Seek medical attention for severe symptoms like extreme thirst, confusion, dizziness, dark urine, or minimal urination.",
    description: "Dehydration occurs when you lose more fluids than you take in. Mild cases can be treated at home, but severe cases require medical attention."
  },
  {
    symptom: "motion sickness",
    medicines: ["Dimenhydrinate", "Meclizine", "Scopolamine patches", "Ginger supplements"],
    dosage: "Motion sickness medications: take 30-60 minutes before travel. Ginger: 250mg capsules as needed.",
    warning: "Most motion sickness medications cause drowsiness. Avoid alcohol and operating machinery while taking them.",
    description: "Motion sickness causes nausea, dizziness, and vomiting during travel. Prevention is easier than treating symptoms once they begin."
  },
  {
    symptom: "toothache",
    medicines: ["Ibuprofen", "Acetaminophen", "Clove oil", "Benzocaine gel"],
    dosage: "Pain relievers: as directed. Topical treatments: apply to affected area as needed.",
    warning: "Dental pain usually indicates a problem requiring professional care. See a dentist promptly, especially if pain is severe or accompanied by fever.",
    description: "Toothaches may result from tooth decay, infection, gum disease, damaged fillings, or teeth grinding. Pain relief is temporary until dental treatment."
  },
  {
    symptom: "menstrual cramps",
    medicines: ["Ibuprofen", "Naproxen", "Combined oral contraceptives", "Heat therapy"],
    dosage: "NSAIDs: start at first sign of symptoms and continue for 2-3 days as needed.",
    warning: "If pain is severe, doesn't respond to medication, or affects daily life, consult a healthcare provider.",
    description: "Menstrual cramps (dysmenorrhea) are throbbing or cramping pains in the lower abdomen before or during menstruation caused by uterine contractions."
  },
  {
    symptom: "back pain",
    medicines: ["NSAIDs", "Muscle relaxants", "Topical analgesics", "Physical therapy"],
    dosage: "Pain relievers: as directed. Muscle relaxants: typically for short-term use only.",
    warning: "Seek immediate care if pain follows injury, is severe, radiates down legs, or is accompanied by numbness, weakness, or bladder/bowel problems.",
    description: "Back pain may be acute or chronic and can result from muscle strain, disc problems, arthritis, or other conditions. Most cases improve with self-care."
  },
  {
    symptom: "eye strain",
    medicines: ["Artificial tears", "Computer glasses", "20-20-20 rule (look away every 20 minutes)"],
    dosage: "Artificial tears: 1-2 drops as needed when eyes feel dry or tired.",
    warning: "If eye strain persists despite rest and home treatments, or if experiencing vision changes, eye pain, or headaches, consult an eye doctor.",
    description: "Digital eye strain results from extended screen time, causing dry eyes, headaches, blurred vision, and neck pain. Regular breaks and proper lighting help."
  }
];

export default medicineData; 