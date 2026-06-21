import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { BrainCircuit, Code, Activity, X, Sparkles, Cpu, ArrowUpRight, Database, Bot, ChevronLeft, ChevronRight } from 'lucide-react';

const aiProjects = [
  {
    id: 'codelens',
    title: 'CodeLens',
    shortDescription: 'An AI agent fine-tuned to act as a Senior Code Reviewer, capable of autonomously detecting bugs, security vulnerabilities, and architectural issues in PRs.',
    logo: '/codelens-brand-v2.svg',
    screenshots: [
      { src: '/Codelens.png', alt: 'CodeLens Dashboard' }
    ],
    huggingFaceUrl: 'https://huggingface.co/spaces/ArshVerma/CodeLens',
    kaggleUrl: 'https://www.kaggle.com/models/arshvermadev/codelens/',
    githubUrl: 'https://github.com/ArshVermaGit/codelens-eval',
    datasetUrl: 'https://www.kaggle.com/datasets/arshvermadev/codelens-dataset',
    modelSummary: 'CodeLens-Reviewer is an AI agent fine-tuned to act as a Senior Code Reviewer. Built upon the Qwen2.5-Coder architecture, this model has been instruction-tuned by Arsh Verma to autonomously detect bugs, identify security vulnerabilities, and critique architectural flaws in Python Pull Requests. It interacts directly with the CodeLens Evaluation Environment, outputting perfectly structured JSON actions to simulate an automated code review loop.',
    details: 'Hardware: Trained on a single NVIDIA Tesla T4 x2 GPU via Kaggle.\nSoftware: Unsloth, PyTorch, Hugging Face Transformers, TRL.\nCompute: Fine-tuning took less than 15 minutes due to Unsloth highly optimized 4-bit LoRA training pipeline. Inference requires under 6GB of VRAM, making it incredibly lightweight and accessible.\n\nModel Characteristics\n\nThe model was fine-tuned from the pre-trained unsloth/Qwen2.5-Coder-7B-Instruct base model. It contains 7 Billion Parameters. LoRA adapters were applied to Q, K, V, O, gate, up, and down projections. The model was trained and quantized in 4-bit to severely reduce VRAM requirements.\n\nData Overview\n\nThe model was trained on a highly specific, synthetically generated instructional dataset targeting code review tasks. The training data contains custom prompt-completion pairs. Each row simulates a CodeLens environment state containing a PR title, a code diff containing planted bugs, and a golden JSON completion representing the ideal code review action.',
    usage: 'This model is intended to be used either standalone for code inference or plugged into the live CodeLens Evaluation Environment. You can load it using the FastLanguageModel from Unsloth in 4-bit precision.\n\nShape of Inputs/Outputs:\n\nInput: Natural language instructions and a python code snippet.\nOutput: A strict JSON object containing action, issue_description, filename, line_number, severity, and category.\nKnown Failures: The model may hallucinate specific line numbers if the provided code diff is extremely long or poorly formatted.',
    codeSnippet: `from unsloth import FastLanguageModel\nimport torch\n\nmax_seq_length = 2048\ndtype = None \nload_in_4bit = True\n\nmodel, tokenizer = FastLanguageModel.from_pretrained(\n    model_name = "arshvermadev/codelens",\n    max_seq_length = max_seq_length,\n    dtype = dtype,\n    load_in_4bit = load_in_4bit,\n)\n\n# Inference Example\nprompt = "Review this python code: ..."\ninputs = tokenizer([prompt], return_tensors="pt").to("cuda")\noutputs = model.generate(**inputs, max_new_tokens=256)\nprint(tokenizer.batch_decode(outputs, skip_special_tokens=True))`,
    limitations: 'The model successfully learned the JSON formatting constraints and correctly identifies logic bugs (e.g., modifying arrays during iteration) without hallucinating markdown wrappers.\n\nBug Detection: High accuracy. Successfully identifies off-by-one and logical loop errors.\nSecurity Audit: Capable of identifying basic input sanitization failures.\nArchitecture: Demonstrates baseline capability in flagging Single Responsibility Principle violations.\n\nThis model is intended strictly for evaluating code within isolated sandboxes or assisting developers. It should not be used to automatically reject or approve production Pull Requests without human oversight, as false positives are possible. No sensitive or PII data was used during the training of this model.',
    system: 'This model serves as the core Agent in the CodeLens Evaluation System. It receives system prompts, noise budgets, and task definitions from the CodeLens Python backend. Its downstream dependency is the CodeLens WebSocket dashboard, which parses the JSON outputs to assign rewards and update the live leaderboard.',
    tech: ['Qwen2.5', 'Unsloth', 'LoRA', 'PyTorch']
  },
  {
    id: 'review-ai',
    title: 'REVIEW.AI',
    shortDescription: 'Multi-class sentiment analysis model for e-commerce reviews based on BERT.',
    logo: '/review-logo.png',
    screenshots: [
      { src: '/review.png', alt: 'Review.AI Dashboard', fallback: true },
      { src: '/confusion_matrix copy.png', alt: 'Confusion Matrix' },
      { src: '/training_loss_curve copy.png', alt: 'Training Loss Curve' }
    ],
    huggingFaceUrl: 'https://huggingface.co/spaces/ArshVerma/review-ai',
    kaggleUrl: 'https://www.kaggle.com/models/arshvermadev/review-ai/',
    githubUrl: 'https://github.com/ArshVermaGit/review-sentiment-analysis',
    modelSummary: 'This model is a fine-tuned version of bert-base-uncased developed to perform multi-class sentiment analysis on e-commerce product reviews. It classifies text into three distinct categories: Positive, Neutral, and Negative.',
    details: 'The model was fine-tuned on the English split of the mteb/amazon_reviews_multi dataset, utilizing a perfectly balanced dataset across all three sentiment classes. It leverages the PyTorch framework and Hugging Face Transformers library, achieving high accuracy (79%+) in detecting the subtle nuances of product feedback.',
    usage: 'You can easily load and use this model for inference using the Hugging Face transformers library.\n\nInput Shape: The model expects raw text strings (product reviews), which are tokenized via AutoTokenizer with a maximum sequence length of 128 tokens. Output Shape: The model outputs logits for 3 classes (0: Negative, 1: Neutral, 2: Positive).',
    codeSnippet: `import torch\nimport torch.nn.functional as F\nfrom transformers import AutoTokenizer, AutoModelForSequenceClassification\n\n# Load model and tokenizer\nmodel_path = "path/to/downloaded/model" \ntokenizer = AutoTokenizer.from_pretrained(model_path)\nmodel = AutoModelForSequenceClassification.from_pretrained(model_path)\n\n# Prepare input\ntext = "The build quality is incredible, but the battery life could be better."\ninputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128, padding=True)\n\n# Inference\nwith torch.no_grad():\n    outputs = model(**inputs)\n    probabilities = F.softmax(outputs.logits, dim=1).squeeze().tolist()\n\nlabels = ["Negative", "Neutral", "Positive"]\nprediction = labels[probabilities.index(max(probabilities))]\n\nprint(f"Sentiment: {prediction}")\nprint(f"Confidences: {dict(zip(labels, probabilities))}")`,
    limitations: 'The model is optimized for English e-commerce product reviews. It may underperform on reviews in other languages or on text from heavily different domains (like medical text or legal documents).\nSarcasm remains a challenging edge case for the classifier.',
    system: 'This model can be used as a standalone component for inference via Python scripts, or integrated as the core intelligence engine within a larger system.\n\nIn our original architecture, this model acts as the intelligence layer behind a Flask REST API (app.py), which serves predictions to a web-based dashboard and logs historical inferences to an SQLite database.\n\nDownstream Dependencies: When using the model outputs downstream, ensure the receiving system maps the predicted label IDs (0, 1, 2) back to their respective string representations (Negative, Neutral, Positive) for human readability.',
    tech: ['BERT', 'NLP', 'PyTorch']
  },
  {
    id: 'mannsaathi',
    title: 'MannSaathi',
    shortDescription: 'An anonymous, multilingual AI healthcare companion that breaks the hesitation to seek medical help.',
    logo: '/mannsaathi-logo.png',
    screenshots: [
      { src: '/mann.png', alt: 'MannSaathi Dashboard' },
      { src: '/mann-sy.png', alt: 'MannSaathi Symptoms Checker' },
      { src: '/mannai.png', alt: 'MannSaathi AI' }
    ],
    video: 'https://www.youtube.com/watch?v=c58bVmaaMQ0',
    huggingFaceUrl: 'https://huggingface.co/ArshVerma/mannsaathi-symptom-classifier-large',
    kaggleUrl: 'https://www.kaggle.com/code/arshvermadev/massive-multilingual-medical-diagnostic-ai/',
    githubUrl: 'https://github.com/ArshVermaGit/mannsaathi',
    datasetUrl: 'https://huggingface.co/datasets/gretelai/symptom_to_diagnosis',
    liveUrl: 'https://mannsaathi-mukk.onrender.com',
    modelSummary: 'MannSaathi is a multilingual medical diagnostic AI that serves as an anonymous healthcare companion. It aims to break the hesitation individuals feel when seeking medical help by providing an accessible, private, and intelligent diagnostic tool.',
    details: 'The project is trained on comprehensive medical datasets, including gretelai/symptom_to_diagnosis and medalpaca/medical_meadow_wikidoc. It utilizes advanced NLP techniques to understand and analyze symptoms described in multiple languages, making healthcare guidance accessible to a broader audience.',
    usage: 'Users interact with the platform through a web-based dashboard where they can converse with the AI or use the dedicated symptom checker. The system predicts potential conditions based on the described symptoms and provides preliminary medical advice. Note: It is not a replacement for professional medical diagnosis.',
    codeSnippet: `import torch\nfrom transformers import AutoTokenizer, AutoModelForSequenceClassification\nimport torch.nn.functional as F\n\nmodel_name = "ArshVerma/mannsaathi-symptom-classifier-large"\ntokenizer = AutoTokenizer.from_pretrained(model_name)\nmodel = AutoModelForSequenceClassification.from_pretrained(model_name)\n\ndef predict_symptom(text):\n    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)\n    with torch.no_grad():\n        outputs = model(**inputs)\n        probs = F.softmax(outputs.logits, dim=1)\n        predicted_class_id = probs.argmax().item()\n        confidence = probs[0][predicted_class_id].item()\n    return model.config.id2label[predicted_class_id], confidence\n\nprediction, score = predict_symptom("I have a severe headache and have been feeling nauseous.")\nprint(f"Condition: {prediction} (Confidence: {score:.2f})")`,
    limitations: 'While highly accurate for common symptoms, the model may struggle with complex, rare, or overlapping medical conditions. It relies on the user providing clear descriptions. As an AI model, it should only be used as a preliminary guidance tool, and users are strongly advised to consult certified medical professionals for official diagnoses and treatment.',
    system: 'The backend leverages Hugging Face Transformers for inference. The model is integrated into a modern web application featuring a dashboard and an AI symptom checker, currently deployed live on Render. It processes multilingual inputs to return accurate medical assessments.',
    tech: ['Healthcare AI', 'NLP', 'Transformers']
  }
];

function AIProjectModal({ 
  project, 
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}: { 
  project: any, 
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void,
  hasPrev: boolean,
  hasNext: boolean
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => { 
      document.body.style.overflow = ''; 
      document.documentElement.style.overflow = '';
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111]/80 backdrop-blur-md p-4 md:p-10 overscroll-none"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative"
      >
        {/* Navigation Buttons (Outside Modal Box) */}
        {hasPrev && (
          <div className="absolute inset-y-0 left-2 md:left-6 flex items-center z-[10000] pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="pointer-events-auto p-2 md:p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full transition-all hover:scale-110 shadow-lg border border-white/10">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        )}
        {hasNext && (
          <div className="absolute inset-y-0 right-2 md:right-6 flex items-center z-[10000] pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="pointer-events-auto p-2 md:p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full transition-all hover:scale-110 shadow-lg border border-white/10">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        )}

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 md:top-6 md:right-6 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border border-[#eaeaea]">
          <X size={20} strokeWidth={3} />
        </button>

        <div data-lenis-prevent="true" className="flex flex-col h-full overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ddd] [&::-webkit-scrollbar-thumb]:rounded-full text-[#111]">
          
          {/* Top Section: Meta Info & Logo */}
          <div className="px-6 py-12 md:px-16 md:py-16 flex flex-col items-center justify-center border-b border-[#eee] bg-white text-center">
             <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mb-6 md:mb-8 relative shrink-0">
                <img src={project.logo} alt={project.title} className="w-full h-full object-contain drop-shadow-sm" />
             </div>
             
             <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
               <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase border border-blue-100 flex items-center gap-1.5 shrink-0">
                 <BrainCircuit className="w-3 h-3 md:w-4 md:h-4" /> AI Model
               </div>
               <div className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase border border-orange-100 flex items-center gap-1.5 shrink-0">
                 <Activity className="w-3 h-3 md:w-4 md:h-4" /> NLP
               </div>
             </div>
             <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-[#111] mb-4 md:mb-6">{project.title}</h2>
             <p className="text-lg md:text-2xl text-[#666] font-medium leading-relaxed max-w-4xl">{project.modelSummary}</p>

             <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 mt-8 md:mt-10 w-full md:w-auto">
               <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#f4f4f5] text-[#111] border border-[#e4e4e7] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#e4e4e7] transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-base md:text-lg">
                 <img src="https://skillicons.dev/icons?i=github" className="w-5 h-5" alt="Github" /> Repository
               </a>
               <a href={project.kaggleUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#111] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-base md:text-lg">
                 <Database className="w-5 h-5 md:w-6 md:h-6" /> Kaggle Weights
               </a>
               {(project.huggingFaceUrl && project.huggingFaceUrl.includes('/spaces/')) ? (
                 <a href={project.huggingFaceUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white border-2 border-[#111] text-[#111] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#f9f9f9] transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-base md:text-lg">
                   <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" /> Live Demo
                 </a>
               ) : (
                 project.huggingFaceUrl && (
                   <a href={project.huggingFaceUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white border-2 border-[#111] text-[#111] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#f9f9f9] transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-base md:text-lg">
                     <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" /> Hugging Face
                   </a>
                 )
               )}
               {project.liveUrl && (
                 <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white border-2 border-[#111] text-[#111] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#f9f9f9] transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-base md:text-lg">
                   <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" /> Live Demo
                 </a>
               )}
               {project.datasetUrl && (
                 <a href={project.datasetUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-base md:text-lg">
                   <Database className="w-5 h-5 md:w-6 md:h-6" /> Dataset
                 </a>
               )}
             </div>
          </div>

          {/* Bottom Section: Single Column Details */}
          <div className="px-6 py-12 md:px-16 md:py-20 bg-[#f9f9f9] flex-1">
             <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
               
               <section>
                 <h3 className="text-2xl md:text-3xl font-black text-[#111] flex items-center gap-3 mb-4 md:mb-6"><Sparkles className="text-blue-500 w-6 h-6 md:w-7 md:h-7 shrink-0" /> Architecture & Training</h3>
                 <p className="text-lg md:text-xl text-[#555] font-medium leading-relaxed">{project.details}</p>
               </section>

               <section>
                 <h3 className="text-2xl md:text-3xl font-black text-[#111] flex items-center gap-3 mb-4 md:mb-6"><Cpu className="text-orange-500 w-6 h-6 md:w-7 md:h-7 shrink-0" /> System Integration</h3>
                 <p className="text-lg md:text-xl text-[#555] font-medium leading-relaxed whitespace-pre-wrap">{project.system}</p>
               </section>

               <section>
                 <h3 className="text-2xl md:text-3xl font-black text-[#111] flex items-center gap-3 mb-4 md:mb-6"><Activity className="text-red-500 w-6 h-6 md:w-7 md:h-7 shrink-0" /> Limitations</h3>
                 <p className="text-lg md:text-xl text-[#555] font-medium leading-relaxed whitespace-pre-wrap">{project.limitations}</p>
               </section>

               <section className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#eee]">
                 <h3 className="text-2xl md:text-3xl font-black text-[#111] flex items-center gap-3 mb-4 md:mb-6"><Code className="text-green-500 w-6 h-6 md:w-7 md:h-7 shrink-0" /> Inference Usage</h3>
                 <p className="text-lg md:text-xl text-[#555] font-medium leading-relaxed mb-6 md:mb-8 whitespace-pre-wrap">{project.usage}</p>
                 <div className="bg-[#111] p-6 md:p-8 rounded-[1.5rem] overflow-x-auto shadow-inner">
                   <pre className="text-sm md:text-base font-mono text-green-400 leading-relaxed">
                     <code>{project.codeSnippet}</code>
                   </pre>
                 </div>
               </section>

               <section>
                 <h3 className="text-3xl font-black text-[#111] mb-8 text-center uppercase tracking-widest opacity-80 mt-10">Visuals & Metrics</h3>
                 
                 {project.video && (
                   <div className="mb-12 bg-[#111] border border-[#eee] rounded-[2rem] overflow-hidden shadow-xl w-full max-w-5xl mx-auto">
                     <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-black">
                       <iframe 
                         src={`https://www.youtube.com/embed/${project.video.split('v=')[1]?.split('&')[0]}`}
                         className="w-full h-full"
                         title="YouTube video player"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         allowFullScreen
                       ></iframe>
                     </div>
                   </div>
                 )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.screenshots.map((img: any, idx: number) => (
                      <div key={idx} onClick={() => setSelectedImageIndex(idx)} className="bg-white border border-[#eee] rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-[4/3] bg-white relative overflow-hidden flex items-center justify-center p-6 border-b border-[#eee]">
                         <img 
                           src={img.src} 
                           alt={img.alt} 
                           className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                           onError={(e) => {
                             e.currentTarget.style.display = 'none';
                             if (img.fallback) {
                               e.currentTarget.parentElement!.innerHTML = `<div class="text-[#ccc] font-bold text-sm uppercase tracking-widest flex flex-col items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg> Image Unavailable</div>`;
                             }
                           }}
                         />
                       </div>
                       <div className="p-6 bg-white text-center">
                         <p className="text-lg font-bold text-[#333]">{img.alt}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </section>

             </div>
          </div>
          
        </div>
      </motion.div>

      {/* Image Viewer Sub-Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#111111]/80 backdrop-blur-md p-4 overscroll-none"
          >
            {/* Prev Button */}
            {selectedImageIndex > 0 && (
              <div className="absolute inset-y-0 left-2 md:left-6 flex items-center z-[10000] pointer-events-none">
                <button 
                  onClick={() => setSelectedImageIndex(prev => prev! - 1)}
                  className="pointer-events-auto p-2 md:p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full transition-all hover:scale-110 shadow-lg border border-white/10"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            )}

            {/* Next Button */}
            {selectedImageIndex < project.screenshots.length - 1 && (
              <div className="absolute inset-y-0 right-2 md:right-6 flex items-center z-[10000] pointer-events-none">
                <button 
                  onClick={() => setSelectedImageIndex(prev => prev! + 1)}
                  className="pointer-events-auto p-2 md:p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full transition-all hover:scale-110 shadow-lg border border-white/10"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            )}

            {/* Close Button */}
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border border-white/10"
            >
              <X size={20} strokeWidth={3} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
              className="w-full max-w-5xl aspect-video glassCard border border-[#eaeaea] rounded-[2rem] shadow-2xl relative flex flex-col items-center justify-center bg-white/90 overflow-hidden"
            >
              <img src={project.screenshots[selectedImageIndex].src} className="w-full h-full object-contain p-2 md:p-6" alt={project.screenshots[selectedImageIndex].alt} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  );
}

export default function AIProjectsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="ai-projects" className="py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden isolate">
      
      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#ec4899] to-[#8b5cf6] rounded-2xl md:rounded-3xl shadow-md transform -rotate-3">
              <Bot className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            AI Projects
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Machine Learning Models & Intelligence Systems.</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
          {aiProjects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              whileInView={{ opacity: 1, scale: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
              className="group glassCard rounded-[3rem] p-2 flex flex-col relative cursor-pointer w-full max-w-[450px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 mx-auto border border-[#eaeaea]"
              onClick={() => setSelectedIdx(idx)}
            >
              <div className="flex-1 rounded-[2.5rem] bg-[#fafafa] border border-[#f0f0f0] flex flex-col relative overflow-hidden">
                 {/* Cover Image Area */}
                 <div className="w-full h-64 bg-white relative overflow-hidden flex items-center justify-center border-b border-[#eaeaea]">
                   {/* Cool glowing background effect */}
                   <div className="absolute inset-0 opacity-60">
                      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/80 via-transparent to-transparent group-hover:scale-110 group-hover:from-purple-100/80 transition-all duration-1000"></div>
                   </div>
                   
                   <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                   
                   <img 
                     src={project.logo} 
                     alt={project.title} 
                     className="w-56 h-56 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-700 relative z-10" 
                     onError={(e) => { e.currentTarget.style.display = 'none'; }}
                   />
                   
                   {/* Live Badge */}
                   <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-[#eaeaea] shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse"></span>
                      <span className="text-[10px] font-black tracking-widest uppercase text-[#555]">Active</span>
                   </div>
                 </div>

                 {/* Content Area */}
                 <div className="flex-1 p-8 md:p-10 flex flex-col relative z-10 bg-white">
                   <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-3xl font-black text-[#111] tracking-tight group-hover:text-[#4f46e5] transition-colors line-clamp-1">{project.title}</h3>
                   </div>
                   
                   <p className="text-[#555] text-base md:text-lg leading-relaxed mb-8 line-clamp-2">
                     {project.shortDescription}
                   </p>
                   
                   {/* Footer Area */}
                   <div className="mt-auto flex items-center justify-between border-t border-[#f5f5f5] pt-6">
                      <div className="flex items-center gap-2 overflow-hidden flex-wrap">
                         {project.tech.map((t: string) => (
                            <span key={t} className="px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-sm group-hover:border-[#cbd5e1] transition-colors">
                               {t}
                            </span>
                         ))}
                      </div>
                      
                      <div className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shrink-0 group-hover:bg-[#4f46e5]">
                        <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                   </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <AIProjectModal 
            project={aiProjects[selectedIdx]} 
            onClose={() => setSelectedIdx(null)} 
            onPrev={() => setSelectedIdx(prev => prev! > 0 ? prev! - 1 : prev)}
            onNext={() => setSelectedIdx(prev => prev! < aiProjects.length - 1 ? prev! + 1 : prev)}
            hasPrev={selectedIdx > 0}
            hasNext={selectedIdx < aiProjects.length - 1}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
