// src/data/quizData.ts
export interface QuizQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
  money: number;
}

// Quiz data focused on drug education and suicide prevention
const allQuizData: QuizQuestion[] = [
  // Drug Education Section
  {
    question: "What is the primary organ responsible for metabolizing alcohol in the human body?",
    correctAnswer: "Liver",
    options: ["Kidney", "Liver", "Stomach", "Brain"],
    money: 1000
  },
  {
    question: "What is the legal blood alcohol content (BAC) limit for driving in most US states?",
    correctAnswer: "0.08%",
    options: ["0.10%", "0.05%", "0.08%", "0.15%"],
    money: 1000
  },
  {
    question: "Delirium tremens (DTs) is a severe form of alcohol withdrawal characterized by what symptoms?",
    correctAnswer: "Shaking, confusion, hallucinations, and seizures",
    options: ["Increased appetite, insomnia, and anxiety", "Shaking, confusion, hallucinations, and seizures", "Muscle cramps, fever, and headache", "Nausea, vomiting, and diarrhea"],
    money: 1000
  },
  {
    question: "What is fetal alcohol syndrome (FAS)?",
    correctAnswer: "A condition in a child that results from alcohol exposure during the mother's pregnancy",
    options: ["A temporary sensitivity to alcohol in newborns", "A condition in a child that results from alcohol exposure during the mother's pregnancy", "A rare genetic disorder affecting alcohol metabolism", "A set of behavioral problems linked to early childhood drinking"],
    money: 1000
  },
  {
    question: "What type of drug is caffeine?",
    correctAnswer: "Stimulant",
    options: ["Depressant", "Hallucinogen", "Stimulant", "Opioid"],
    money: 1000
  },
  {
    question: "What is the addictive substance found in cigarettes?",
    correctAnswer: "Nicotine",
    options: ["Tar", "Carbon Monoxide", "Nicotine", "Formaldehyde"],
    money: 1000
  },
  {
    question: "Chronic smoking is a major risk factor for which respiratory disease?",
    correctAnswer: "Lung cancer or Emphysema or Chronic bronchitis (COPD)",
    options: ["Asthma", "Pneumonia", "Lung cancer or Emphysema or Chronic bronchitis (COPD)", "Tuberculosis"],
    money: 1000
  },
  {
    question: "What is secondhand smoke?",
    correctAnswer: "Smoke inhaled passively by nonsmokers from the environment",
    options: ["Smoke exhaled by a smoker", "Smoke from burning tobacco products", "Smoke inhaled passively by nonsmokers from the environment", "Smoke filtered through a cigarette holder"],
    money: 1000
  },
  {
    question: "What is vaping?",
    correctAnswer: "The act of inhaling and exhaling an aerosol produced by an e-cigarette or similar device",
    options: ["Smoking traditional cigarettes with flavored tobacco", "The act of inhaling and exhaling an aerosol produced by an e-cigarette or similar device", "Using a nebulizer for respiratory treatment", "Burning incense for aromatherapy"],
    money: 1000
  },
  {
    question: "What are the potential long-term health effects of vaping?",
    correctAnswer: "Lung damage, cardiovascular issues, addiction",
    options: ["Improved lung capacity, reduced stress, weight loss", "No significant long-term effects", "Lung damage, cardiovascular issues, addiction", "Increased bone density, better sleep patterns, enhanced cognitive function"],
    money: 1000
  },
  {
    question: "What category of drugs includes heroin, morphine, and oxycodone?",
    correctAnswer: "Opioids",
    options: ["Stimulants", "Opioids", "Hallucinogens", "Depressants"],
    money: 1000
  },
  {
    question: "What is the primary use of opioids in medicine?",
    correctAnswer: "Pain relief",
    options: ["Treating infections", "Lowering blood pressure", "Pain relief", "Reducing inflammation"],
    money: 1000
  },
  {
    question: "What is a significant danger of opioid overdose?",
    correctAnswer: "Respiratory depression (slowed or stopped breathing)",
    options: ["Increased heart rate", "High blood pressure", "Respiratory depression (slowed or stopped breathing)", "Severe headache"],
    money: 1000
  },
  {
    question: "What is Narcan (naloxone) used for?",
    correctAnswer: "Reversing opioid overdose",
    options: ["Treating alcohol withdrawal", "Reversing opioid overdose", "Managing cocaine addiction", "Inducing sleep"],
    money: 1000
  },
  {
    question: "Which of these substances has the highest risk of fatal overdose?",
    correctAnswer: "Fentanyl",
    options: ["Marijuana", "LSD", "Fentanyl", "Caffeine"],
    money: 1000
  },
  {
    question: "What type of drug is cocaine?",
    correctAnswer: "Stimulant",
    options: ["Depressant", "Stimulant", "Hallucinogen", "Opioid"],
    money: 1000
  },
  {
    question: "What are some of the short-term effects of cocaine use?",
    correctAnswer: "Increased heart rate, blood pressure, and energy; euphoria",
    options: ["Slowed heart rate, low blood pressure, and fatigue", "Increased appetite and drowsiness", "Increased heart rate, blood pressure, and energy; euphoria", "Decreased coordination and slurred speech"],
    money: 1000
  },
  {
    question: "What is methamphetamine?",
    correctAnswer: "A potent and highly addictive stimulant drug",
    options: ["A mild pain reliever", "A non-addictive sleep aid", "A potent and highly addictive stimulant drug", "An antidepressant medication"],
    money: 1000
  },
  {
    question: "What are some of the long-term effects of methamphetamine use?",
    correctAnswer: "Severe dental problems ('meth mouth'), skin sores, weight loss, paranoia, hallucinations",
    options: ["Improved dental health, clearer skin, weight gain, reduced anxiety", "No significant long-term effects", "Severe dental problems ('meth mouth'), skin sores, weight loss, paranoia, hallucinations", "Increased muscle mass, enhanced memory, improved vision"],
    money: 1000
  },
  {
    question: "What category of drugs includes LSD and psilocybin?",
    correctAnswer: "Hallucinogens",
    options: ["Stimulants", "Depressants", "Hallucinogens", "Opioids"],
    money: 1000
  },
  {
    question: "What are some of the effects of hallucinogenic drugs?",
    correctAnswer: "Altered perception, mood, and thought",
    options: ["Increased focus and concentration", "Decreased sensitivity to pain", "Altered perception, mood, and thought", "Improved motor coordination"],
    money: 1000
  },
  {
    question: "What is marijuana?",
    correctAnswer: "A psychoactive drug from the Cannabis plant",
    options: ["A type of antibiotic", "A psychoactive drug from the Cannabis plant", "A common household cleaning agent", "A natural remedy for headaches"],
    money: 1000
  },
  {
    question: "What are some of the potential short-term effects of marijuana use?",
    correctAnswer: "Altered sensory perception, impaired coordination, increased appetite",
    options: ["Increased energy and alertness", "Decreased appetite and improved focus", "Altered sensory perception, impaired coordination, increased appetite", "Improved sleep and reduced anxiety"],
    money: 1000
  },
  {
    question: "What are some of the potential long-term effects of heavy marijuana use?",
    correctAnswer: "Respiratory problems, potential cognitive impairment, possible increased risk of certain mental health issues",
    options: ["Improved lung function, enhanced memory, reduced risk of mental illness", "No significant long-term effects", "Respiratory problems, potential cognitive impairment, possible increased risk of certain mental health issues", "Increased cardiovascular health, stronger immune system, improved mood stability"],
    money: 1000
  },
  {
    question: "What are inhalants?",
    correctAnswer: "Volatile substances that produce chemical vapors that can be inhaled to induce psychoactive effects",
    options: ["Medications used to treat asthma", "Volatile substances that produce chemical vapors that can be inhaled to induce psychoactive effects", "Essential oils used for aromatherapy", "Gases used in medical anesthesia"],
    money: 1000
  },
  {
    question: "What are some of the serious risks associated with inhalant use?",
    correctAnswer: "Sudden sniffing death syndrome, brain damage, liver and kidney damage",
    options: ["Mild headache, temporary dizziness", "Sudden sniffing death syndrome, brain damage, liver and kidney damage", "Minor skin irritation, dry mouth", "Temporary memory loss, mild nausea"],
    money: 1000
  },
  {
    question: "What is tolerance in relation to drug use?",
    correctAnswer: "The need for increasing amounts of a substance to achieve the same effect",
    options: ["The body's natural immunity to a substance", "The need for increasing amounts of a substance to achieve the same effect", "The ability to withstand drug side effects", "A measured approach to recreational drug use"],
    money: 1000
  },
  {
    question: "What is physical dependence?",
    correctAnswer: "A state in which the body has adapted to a drug and experiences withdrawal when use stops",
    options: ["The inability to function without exercise", "A state in which the body has adapted to a drug and experiences withdrawal when use stops", "A strong preference for a particular medication", "The need for physical support during recovery"],
    money: 1000
  },
  {
    question: "What is withdrawal?",
    correctAnswer: "Physical and psychological symptoms that occur when a dependent person stops using a substance",
    options: ["Removing money from a bank account", "Physical and psychological symptoms that occur when a dependent person stops using a substance", "A medical procedure to detoxify the blood", "The process of gradually reducing medication dosage"],
    money: 1000
  },
  {
    question: "What is drug addiction?",
    correctAnswer: "A chronic, relapsing disorder characterized by compulsive drug seeking and use despite adverse consequences",
    options: ["A temporary interest in trying new substances", "A chronic, relapsing disorder characterized by compulsive drug seeking and use despite adverse consequences", "A mild preference for prescription medications", "A behavioral pattern limited to weekends and special occasions"],
    money: 1000
  },
  {
    question: "What is detoxification in the context of substance abuse treatment?",
    correctAnswer: "The process of allowing the body to remove the substance while managing withdrawal symptoms",
    options: ["A cleansing juice diet", "Using special products to cleanse the digestive system", "The process of allowing the body to remove the substance while managing withdrawal symptoms", "A spa treatment to remove toxins through the skin"],
    money: 1000
  },
  {
    question: "What are benzodiazepines primarily prescribed for?",
    correctAnswer: "Anxiety and insomnia",
    options: ["Pain relief", "Depression", "Anxiety and insomnia", "Attention deficit disorders"],
    money: 1000
  },
  {
    question: "What is the term for using multiple drugs simultaneously?",
    correctAnswer: "Polydrug use",
    options: ["Cross addiction", "Polydrug use", "Multiple substance disorder", "Dual dependency"],
    money: 1000
  },
  {
    question: "What drug category does MDMA (Ecstasy) primarily belong to?",
    correctAnswer: "Stimulant with hallucinogenic properties",
    options: ["Pure hallucinogen", "Opioid", "Depressant", "Stimulant with hallucinogenic properties"],
    money: 1000
  },
  {
    question: "What is a 'designer drug'?",
    correctAnswer: "A synthetic version of an illegal drug created to avoid legal restrictions",
    options: ["A prescription drug designed for a specific patient", "A synthetic version of an illegal drug created to avoid legal restrictions", "A drug developed by fashion designers", "A medication with an appealing tablet design"],
    money: 1000
  },
  {
    question: "Which of the following is NOT typically a sign of drug addiction?",
    correctAnswer: "Improved work or school performance",
    options: ["Neglecting responsibilities", "Improved work or school performance", "Using despite negative consequences", "Physical withdrawal symptoms"],
    money: 1000
  },
  {
    question: "What is typically the first step in addiction treatment?",
    correctAnswer: "Assessment and acknowledgment of the problem",
    options: ["Residential rehab", "Medication", "Assessment and acknowledgment of the problem", "Group therapy"],
    money: 1000
  },
  {
    question: "What is the term for the pattern of abstaining from drug use, then relapsing, then abstaining again?",
    correctAnswer: "Cycle of recovery and relapse",
    options: ["Intermittent usage", "Cycle of recovery and relapse", "Controlled consumption", "Periodic abstinence"],
    money: 1000
  },
  {
    question: "Which medication is commonly used to treat alcohol dependence by causing unpleasant reactions if alcohol is consumed?",
    correctAnswer: "Disulfiram (Antabuse)",
    options: ["Methadone", "Naltrexone", "Disulfiram (Antabuse)", "Buprenorphine"],
    money: 1000
  },
  {
    question: "What is the term for drugs that slow down the central nervous system?",
    correctAnswer: "Depressants",
    options: ["Stimulants", "Depressants", "Hallucinogens", "Analgesics"],
    money: 1000
  },
  {
    question: "What is 'microdosing'?",
    correctAnswer: "Taking very small amounts of psychedelic drugs",
    options: ["Taking multiple drugs in small doses", "Taking very small amounts of psychedelic drugs", "A method of administering vaccines", "Taking medication in precise intervals"],
    money: 1000
  },

  // Suicide Prevention Section
  {
    question: "What is one of the most common warning signs that someone might be considering suicide?",
    correctAnswer: "Talking about wanting to die or kill themselves",
    options: ["Improved mood after a period of depression", "Talking about wanting to die or kill themselves", "Starting new hobbies or interests", "Sleeping normal hours"],
    money: 1000
  },
  {
    question: "What is the appropriate response if someone tells you they are thinking about suicide?",
    correctAnswer: "Take it seriously and help them get professional support",
    options: ["Tell them to cheer up", "Change the subject to distract them", "Take it seriously and help them get professional support", "Leave them alone to process their feelings"],
    money: 1000
  },
  {
    question: "Which of the following is a risk factor for suicide?",
    correctAnswer: "Previous suicide attempt",
    options: ["Strong social connections", "Previous suicide attempt", "Regular exercise routine", "Stable employment"],
    money: 1000
  },
  {
    question: "What is a protective factor that may reduce suicide risk?",
    correctAnswer: "Strong social support and connections",
    options: ["Isolation", "Access to lethal means", "Strong social support and connections", "Untreated mental health conditions"],
    money: 1000
  },
  {
    question: "What is the National Suicide Prevention Lifeline number in the United States?",
    correctAnswer: "988 or 1-800-273-8255",
    options: ["911", "988 or 1-800-273-8255", "1-800-SUICIDE", "211"],
    money: 1000
  },
  {
    question: "Which of the following is NOT typically a warning sign of suicide?",
    correctAnswer: "Making new future plans and commitments",
    options: ["Giving away prized possessions", "Making new future plans and commitments", "Increased substance use", "Expressing feelings of hopelessness"],
    money: 1000
  },
  {
    question: "What is the relationship between substance abuse and suicide risk?",
    correctAnswer: "Substance abuse increases suicide risk",
    options: ["There is no significant relationship", "Substance abuse increases suicide risk", "Substance abuse decreases suicide risk", "The relationship has not been studied"],
    money: 1000
  },
  {
    question: "What's a common myth about suicide?",
    correctAnswer: "People who talk about suicide are just seeking attention and won't actually do it",
    options: ["Suicide affects people of all backgrounds", "People who talk about suicide are just seeking attention and won't actually do it", "Mental health conditions are risk factors for suicide", "Suicide is a serious public health issue"],
    money: 1000
  },
  {
    question: "What does the QPR approach to suicide prevention stand for?",
    correctAnswer: "Question, Persuade, Refer",
    options: ["Question, Persuade, Refer", "Quality, Prevention, Response", "Quick, Practical, Remediation", "Query, Provide, Respond"],
    money: 1000
  },
  {
    question: "Which of the following is an appropriate way to talk to someone who may be suicidal?",
    correctAnswer: "Ask directly if they are thinking about suicide",
    options: ["Avoid the topic of suicide so you don't put the idea in their head", "Tell them others have it worse", "Ask directly if they are thinking about suicide", "Promise to keep their thoughts of suicide secret"],
    money: 1000
  },
  {
    question: "What is one of the first steps in helping a suicidal person?",
    correctAnswer: "Ensure they're not left alone",
    options: ["Give them space to process their feelings", "Ensure they're not left alone", "Tell them to snap out of it", "Ignore warning signs to avoid embarrassment"],
    money: 1000
  },
  {
    question: "Which of the following is a common warning sign of suicide?",
    correctAnswer: "Expressing feelings of being a burden to others",
    options: ["Increased appetite", "Expressing feelings of being a burden to others", "Improved sleep patterns", "Starting new relationships"],
    money: 1000
  },
  {
    question: "What does 'means restriction' refer to in suicide prevention?",
    correctAnswer: "Limiting access to methods that could be used for suicide",
    options: ["Limiting media coverage of suicide", "Restricting who can receive mental health treatment", "Limiting access to methods that could be used for suicide", "Restricting discussions about suicide"],
    money: 1000
  },
  {
    question: "Which of the following statements about suicide is true?",
    correctAnswer: "Most people who attempt suicide have given warning signs",
    options: ["Suicide happens without warning", "Most people who attempt suicide have given warning signs", "Only people with diagnosed mental illness attempt suicide", "Suicide rates are decreasing globally"],
    money: 1000
  },
  {
    question: "What is 'suicide contagion'?",
    correctAnswer: "The process by which exposure to suicide or suicidal behaviors can increase suicidal behavior in others",
    options: ["A method of suicide prevention", "The process by which exposure to suicide or suicidal behaviors can increase suicidal behavior in others", "The inheritance of suicidal tendencies", "A medical term for suicide clusters"],
    money: 1000
  },
  {
    question: "Which demographic group has the highest suicide rate in the United States?",
    correctAnswer: "Middle-aged white men",
    options: ["Teenagers", "Elderly women", "Middle-aged white men", "Young adults"],
    money: 1000
  },
  {
    question: "What is 'postvention' in relation to suicide?",
    correctAnswer: "Activities to help those affected by a suicide loss",
    options: ["Prevention efforts after a failed attempt", "Activities to help those affected by a suicide loss", "Medical treatment after an attempt", "Research conducted after suicide clusters"],
    money: 1000
  },
  {
    question: "What should you NOT do when talking to someone who is suicidal?",
    correctAnswer: "Minimize their problems or give advice like 'cheer up'",
    options: ["Listen openly without judgment", "Minimize their problems or give advice like 'cheer up'", "Connect them with professional help", "Take their thoughts seriously"],
    money: 1000
  },
  {
    question: "Which of the following mental health conditions is most strongly associated with increased suicide risk?",
    correctAnswer: "Depression",
    options: ["Attention deficit hyperactivity disorder", "Depression", "Specific phobias", "Mild anxiety"],
    money: 1000
  },
  {
    question: "What is a safety plan in suicide prevention?",
    correctAnswer: "A personalized plan that helps someone recognize warning signs and coping strategies",
    options: ["A hospital's protocol for treating suicidal patients", "A personalized plan that helps someone recognize warning signs and coping strategies", "A school's procedure for handling suicidal students", "A government policy for reducing suicide rates"],
    money: 1000
  },
  {
    question: "What does it mean if someone is experiencing suicidal ideation?",
    correctAnswer: "They are having thoughts about suicide",
    options: ["They have attempted suicide", "They are having thoughts about suicide", "They are planning a suicide attempt", "They have lost someone to suicide"],
    money: 1000
  },
  {
    question: "Which of the following is a critical time when suicide risk may increase?",
    correctAnswer: "When being discharged from psychiatric hospitalization",
    options: ["During holiday seasons", "When starting a new job", "When being discharged from psychiatric hospitalization", "During summer months"],
    money: 1000
  },
  {
    question: "What is the goal of dialectical behavior therapy (DBT) in relation to suicide prevention?",
    correctAnswer: "To help individuals regulate emotions and develop coping skills",
    options: ["To provide medication to treat depression", "To help individuals regulate emotions and develop coping skills", "To identify genetic markers for suicide risk", "To isolate suicidal individuals from triggers"],
    money: 1000
  },
  {
    question: "What is the relationship between bullying and suicide risk?",
    correctAnswer: "Being bullied increases suicide risk, especially among youth",
    options: ["There is no established relationship", "Being bullied increases suicide risk, especially among youth", "Bullying decreases suicide risk by building resilience", "Only cyberbullying is related to suicide risk"],
    money: 1000
  },
  {
    question: "Which of the following is an evidence-based approach to suicide prevention?",
    correctAnswer: "Cognitive Behavioral Therapy (CBT)",
    options: ["Isolation during crisis periods", "Avoiding discussion of suicidal thoughts", "Cognitive Behavioral Therapy (CBT)", "Minimizing the seriousness of threats"],
    money: 1000
  },
  {
    question: "What does 'lethal means counseling' involve?",
    correctAnswer: "Working with at-risk individuals and their families to reduce access to means of suicide",
    options: ["Teaching about the lethality of different suicide methods", "Working with at-risk individuals and their families to reduce access to means of suicide", "Counseling only after a lethal suicide attempt", "Advising on less lethal methods of self-harm"],
    money: 1000
  },
  {
    question: "What is a common barrier to seeking help for suicidal thoughts?",
    correctAnswer: "Stigma surrounding mental health and suicide",
    options: ["Lack of suicidal ideation", "Too many available resources", "Stigma surrounding mental health and suicide", "Excessive professional support"],
    money: 1000
  },
  {
    question: "Which approach is recommended when someone reveals they are having suicidal thoughts?",
    correctAnswer: "Listen non-judgmentally and connect them to professional help",
    options: ["Challenge them to prove they're serious", "Listen non-judgmentally and connect them to professional help", "Tell them to focus on the positive things in life", "Keep it a secret as they requested"],
    money: 1000
  },
  {
    question: "What is an important component of school-based suicide prevention programs?",
    correctAnswer: "Training staff to recognize warning signs and how to respond",
    options: ["Avoiding discussion of suicide", "Training staff to recognize warning signs and how to respond", "Implementing stricter discipline policies", "Reducing academic pressure completely"],
    money: 1000
  },
  {
    question: "Why is follow-up care important after someone has experienced a suicidal crisis?",
    correctAnswer: "The period following a crisis remains high-risk for suicide attempts",
    options: ["It's just a formality with little impact", "The period following a crisis remains high-risk for suicide attempts", "It's only important for documentation purposes", "Follow-up care is generally unnecessary"],
    money: 1000
  },
  {
    question: "What is the relationship between substance use and suicide risk?",
    correctAnswer: "Substance use can increase impulsivity and reduce inhibitions, increasing suicide risk",
    options: ["There is no significant relationship", "Substance use always decreases suicide risk", "Substance use can increase impulsivity and reduce inhibitions, increasing suicide risk", "Only illegal substances affect suicide risk"],
    money: 1000
  },

  // Drug Education/Mental Health Intersection
  {
    question: "How does alcohol affect depression?",
    correctAnswer: "Alcohol can worsen depression symptoms",
    options: ["Alcohol has no effect on depression", "Alcohol can worsen depression symptoms", "Alcohol always improves depression symptoms", "Alcohol affects only anxiety, not depression"],
    money: 1000
  },
  {
    question: "What is 'dual diagnosis' in mental health?",
    correctAnswer: "The co-occurrence of a mental health disorder and substance use disorder",
    options: ["Having two separate mental health conditions", "The co-occurrence of a mental health disorder and substance use disorder", "Being diagnosed by two different doctors", "A second opinion on a diagnosis"],
    money: 1000
  },
  {
    question: "Which of the following substances is most likely to increase suicidal thoughts when used heavily?",
    correctAnswer: "Alcohol",
    options: ["Caffeine", "Alcohol", "Vitamin supplements", "Probiotics"],
    money: 1000
  },
  {
    question: "What is one way substance use can increase suicide risk?",
    correctAnswer: "By increasing impulsivity and decreasing inhibition",
    options: ["By improving decision-making abilities", "By increasing impulsivity and decreasing inhibition", "By enhancing problem-solving skills", "By reducing access to means of suicide"],
    money: 1000
  },
  {
    question: "What percentage of suicide deaths involve alcohol or drug use?",
    correctAnswer: "Approximately 30-40%",
    options: ["Less than 5%", "Approximately 10-15%", "Approximately 30-40%", "Over 75%"],
    money: 1000
  },
  {
    question: "What is self-medication in the context of mental health?",
    correctAnswer: "Using substances to cope with mental health symptoms without medical supervision",
    options: ["Taking prescribed medication without doctor supervision", "Using substances to cope with mental health symptoms without medical supervision", "Adjusting prescribed medication dosages independently", "Taking over-the-counter medication for minor ailments"],
    money: 1000
  },
  {
    question: "Which of these statements about recovery is true?",
    correctAnswer: "Recovery from both substance use disorders and mental health conditions is possible",
    options: ["Full recovery from addiction is impossible", "Recovery from both substance use disorders and mental health conditions is possible", "Recovery is only possible for certain substances", "Mental health conditions are permanent and cannot improve"],
    money: 1000
  },
  {
    question: "What is an integrated treatment approach?",
    correctAnswer: "Treating mental health and substance use disorders simultaneously",
    options: ["Treating only the most severe condition first", "Treating mental health and substance use disorders simultaneously", "Using only one type of therapy for all conditions", "Focusing exclusively on medication management"],
    money: 1000
  },
  {
    question: "What role can trauma play in substance use and suicide risk?",
    correctAnswer: "Trauma can increase both substance use and suicide risk",
    options: ["Trauma is unrelated to substance use or suicide risk", "Trauma can increase both substance use and suicide risk", "Trauma only affects substance use, not suicide risk", "Trauma decreases both substance use and suicide risk"],
    money: 1000
  },
  {
    question: "Which of the following is a sign of both depression and substance withdrawal?",
    correctAnswer: "Sleep disturbances",
    options: ["Elevated mood", "Sleep disturbances", "Increased energy", "Improved concentration"],
    money: 1000
  },
  {
    question: "What does SBIRT stand for in healthcare screening?",
    correctAnswer: "Screening, Brief Intervention, and Referral to Treatment",
    options: ["Screening, Brief Intervention, and Referral to Treatment", "Substance Behavior Identification and Response Technique", "Suicide and Behavioral Intervention Response Team", "Systematic Behavioral Intervention and Risk Training"],
    money: 1000
  },
  {
    question: "What is harm reduction?",
    correctAnswer: "A set of practical strategies aimed at reducing negative consequences of drug use",
    options: ["Complete abstinence from substances", "A set of practical strategies aimed at reducing negative consequences of drug use", "Punishment for substance use to deter future use", "Limiting information about drugs to prevent experimentation"],
    money: 1000
  },
  {
    question: "Which mental health condition most commonly co-occurs with substance use disorders?",
    correctAnswer: "Depression",
    options: ["Schizophrenia", "Depression", "Eating disorders", "Specific phobias"],
    money: 1000
  },
  {
    question: "What is resilience in mental health?",
    correctAnswer: "The ability to adapt well in the face of adversity, trauma, or stress",
    options: ["The ability to avoid all negative experiences", "The ability to adapt well in the face of adversity, trauma, or stress", "The capacity to remain unaffected by external events", "Being resistant to mental health treatments"],
    money: 1000
  },
  {
    question: "What is Motivational Interviewing used for?",
    correctAnswer: "A counseling approach that helps people resolve ambivalence about change",
    options: ["A technique for diagnosing mental health conditions", "A method for determining substance dependence", "A counseling approach that helps people resolve ambivalence about change", "A job interview strategy for mental health professionals"],
    money: 1000
  },
  {
    question: "What does it mean to have a 'protective factor' against suicide or substance abuse?",
    correctAnswer: "A characteristic or condition that helps guard against negative outcomes",
    options: ["A legal restraining order", "A characteristic or condition that helps guard against negative outcomes", "A type of medication that prevents relapse", "A person who watches over someone at risk"],
    money: 1000
  },
  {
    question: "Which of the following is both a symptom of depression and a risk factor for substance abuse?",
    correctAnswer: "Social isolation",
    options: ["Increased appetite", "Social isolation", "Improved concentration", "Physical fitness"],
    money: 1000
  },
  {
    question: "What is an EAP?",
    correctAnswer: "Employee Assistance Program - workplace resource for mental health and substance use issues",
    options: ["Emergency Action Plan for suicidal individuals", "Employee Assistance Program - workplace resource for mental health and substance use issues", "Evaluation and Assessment Protocol for addiction", "Extended Abstinence Program for recovery"],
    money: 1000
  },
]

export default allQuizData;