import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { BrainCircuit, Code, Activity, X, Sparkles, Cpu, ArrowUpRight, Database, Bot } from 'lucide-react';

const aiProjects = [
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
  }
];

function AIProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border border-[#eaeaea]">
          <X size={20} strokeWidth={3} />
        </button>

        <div data-lenis-prevent="true" className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ddd] [&::-webkit-scrollbar-thumb]:rounded-full text-[#111]">
          
          {/* Top Section: Meta Info & Logo */}
          <div className="px-6 py-12 md:px-16 md:py-16 flex flex-col items-center justify-center border-b border-[#eee] bg-white text-center">
             <div className="w-32 h-32 md:w-48 md:h-48 mb-8 relative">
                <img src={project.logo} alt={project.title} className="w-full h-full object-contain drop-shadow-sm" />
             </div>
             
             <div className="flex items-center gap-3 mb-6">
               <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest uppercase border border-blue-100 flex items-center gap-1.5">
                 <BrainCircuit size={12} /> AI Model
               </div>
               <div className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-black tracking-widest uppercase border border-orange-100 flex items-center gap-1.5">
                 <Activity size={12} /> NLP
               </div>
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] mb-6">{project.title}</h2>
             <p className="text-xl md:text-2xl text-[#666] font-medium leading-relaxed max-w-4xl">{project.modelSummary}</p>

             <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
               <a href={project.githubUrl} target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#f4f4f5] text-[#111] border border-[#e4e4e7] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#e4e4e7] transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-lg">
                 <img src="https://skillicons.dev/icons?i=github" className="w-5 h-5" alt="Github" /> Repository
               </a>
               <a href={project.kaggleUrl} target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#111] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
                 <Database size={20} /> Kaggle Weights
               </a>
               <a href={project.huggingFaceUrl} target="_blank" rel="noreferrer" className="px-8 py-4 bg-white border-2 border-[#111] text-[#111] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#f9f9f9] transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-lg">
                 <ArrowUpRight size={20} /> Live Demo
               </a>
             </div>
          </div>

          {/* Bottom Section: Single Column Details */}
          <div className="px-6 py-12 md:px-16 md:py-20 bg-[#f9f9f9] flex-1">
             <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
               
               <section>
                 <h3 className="text-3xl font-black text-[#111] flex items-center gap-3 mb-6"><Sparkles className="text-blue-500" size={28} /> Architecture & Training</h3>
                 <p className="text-xl text-[#555] font-medium leading-relaxed">{project.details}</p>
               </section>

               <section>
                 <h3 className="text-3xl font-black text-[#111] flex items-center gap-3 mb-6"><Cpu className="text-orange-500" size={28} /> System Integration</h3>
                 <p className="text-xl text-[#555] font-medium leading-relaxed whitespace-pre-wrap">{project.system}</p>
               </section>

               <section>
                 <h3 className="text-3xl font-black text-[#111] flex items-center gap-3 mb-6"><Activity className="text-red-500" size={28} /> Limitations</h3>
                 <p className="text-xl text-[#555] font-medium leading-relaxed whitespace-pre-wrap">{project.limitations}</p>
               </section>

               <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#eee]">
                 <h3 className="text-3xl font-black text-[#111] flex items-center gap-3 mb-6"><Code className="text-green-500" size={28} /> Inference Usage</h3>
                 <p className="text-xl text-[#555] font-medium leading-relaxed mb-8 whitespace-pre-wrap">{project.usage}</p>
                 <div className="bg-[#111] p-6 md:p-8 rounded-[1.5rem] overflow-x-auto shadow-inner">
                   <pre className="text-sm md:text-base font-mono text-green-400 leading-relaxed">
                     <code>{project.codeSnippet}</code>
                   </pre>
                 </div>
               </section>

               <section>
                 <h3 className="text-3xl font-black text-[#111] mb-8 text-center uppercase tracking-widest opacity-80 mt-10">Visuals & Metrics</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {project.screenshots.map((img: any, idx: number) => (
                     <div key={idx} className="bg-white border border-[#eee] rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
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
        
        <div className="flex justify-center items-center w-full">
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
                     className="w-40 h-40 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-700 relative z-10" 
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
          />
        )}
      </AnimatePresence>
    </section>
  );
}
