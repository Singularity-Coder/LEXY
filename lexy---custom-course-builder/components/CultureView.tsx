
import React, { useState } from 'react';
import { BookRecommendation, CultureItem, CultureAsset } from '../types';

interface CultureViewProps {
  books?: BookRecommendation[];
  cultureItems?: CultureItem[];
}

const CultureView: React.FC<CultureViewProps> = ({ books = [], cultureItems = [] }) => {
  const [selectedItem, setSelectedItem] = useState<CultureItem | BookRecommendation | null>(null);
  const [quizMode, setQuizMode] = useState(false);

  const categories = [
    'Famous people',
    'Art & Masterpieces',
    'Books',
    'Movies & TV series',
    'Music & Artists',
    'Folklore & Traditions',
    'Icons & Landmarks',
    'Religion & Beliefs',
    'Festivals'
  ] as const;

  const renderCard = (item: CultureItem | BookRecommendation, category: string) => {
    const isBook = 'author' in item;
    const title = item.title;
    const description = item.description;
    const thumb = isBook ? (item as BookRecommendation).imageUrl : (item as CultureItem).thumbnailUrl;
    const subtitle = isBook ? `by ${(item as BookRecommendation).author}` : (item as CultureItem).subtitle;
    const platform = !isBook ? (item as CultureItem).platform || '' : 'Book';

    return (
      <div 
        key={item.id} 
        className="duo-card overflow-hidden group hover:border-[#ad46ff] transition-all flex flex-col cursor-pointer bg-white shrink-0 w-72 sm:w-80"
        onClick={() => setSelectedItem(item)}
      >
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img 
            src={thumb} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {platform && (
            <div className="absolute top-4 right-4 bg-black/70 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase backdrop-blur-sm">
              {platform}
            </div>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); alert("Add Quiz Tool - Coming Soon!"); }}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-purple-600 p-2 px-3 rounded-xl text-[9px] font-black shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            + ADD QUIZ
          </button>
        </div>
        <div className="p-5 space-y-1 flex-1 flex flex-col">
          <span className="text-[10px] font-black text-[#ad46ff] uppercase tracking-widest">{category}</span>
          <h3 className="text-lg font-black text-gray-800 leading-tight truncate">{title}</h3>
          {subtitle && <p className="text-[10px] font-bold text-gray-400 truncate">{subtitle}</p>}
          <p className="text-gray-500 font-bold text-xs line-clamp-2 mt-2">{description}</p>
        </div>
      </div>
    );
  };

  const renderSection = (category: typeof categories[number]) => {
    let items: (CultureItem | BookRecommendation)[] = [];
    
    if (category === 'Books') {
      items = books;
    } else {
      items = cultureItems.filter(item => item.category === category);
    }

    if (items.length === 0) return null;

    return (
      <div key={category} className="space-y-6">
        <div className="flex items-center justify-between px-2 border-l-4 border-[#ad46ff] pl-4">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest">{category}</h2>
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{items.length} Items</span>
        </div>
        <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x px-2 -mx-2">
          {items.map((item) => renderCard(item, category))}
        </div>
      </div>
    );
  };

  const renderAsset = (asset: CultureAsset, index: number) => {
    switch (asset.type) {
      case 'youtube':
        const videoId = asset.value.split('v=')[1] || asset.value.split('/').pop();
        return (
          <div key={index} className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-gray-100 shadow-sm bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={asset.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      case 'video':
        return (
          <div key={index} className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-gray-100 shadow-sm bg-black">
            <video src={asset.value} controls className="w-full h-full" />
          </div>
        );
      case 'image':
        return (
          <div key={index} className="w-full rounded-3xl overflow-hidden border-2 border-gray-100 shadow-sm">
            <img src={asset.value} alt={asset.name} className="w-full object-contain bg-gray-50" />
          </div>
        );
      case 'audio':
        return (
          <div key={index} className="w-full p-6 bg-purple-50 rounded-3xl border-2 border-purple-100 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎵</span>
              <span className="text-sm font-black text-purple-800 truncate">{asset.name}</span>
            </div>
            <audio src={asset.value} controls className="w-full" />
          </div>
        );
      case 'pdf':
        return (
          <a
            key={index}
            href={asset.value}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-6 bg-red-50 rounded-3xl border-2 border-red-100 flex items-center justify-between hover:bg-red-100 transition-all group"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📄</span>
              <div className="flex flex-col">
                <span className="text-sm font-black text-red-800">{asset.name}</span>
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Open PDF Document</span>
              </div>
            </div>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </a>
        );
      case 'link':
        return (
          <a
            key={index}
            href={asset.value}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-6 bg-gray-50 rounded-3xl border-2 border-gray-100 flex items-center justify-between hover:bg-gray-100 transition-all group"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🔗</span>
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-800">{asset.name}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">External Resource</span>
              </div>
            </div>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </a>
        );
      default:
        return null;
    }
  };

  if (quizMode && selectedItem) {
    return (
      <div className="fixed inset-0 z-[150] bg-white flex flex-col animate-in fade-in duration-300">
        <div className="max-w-4xl mx-auto w-full p-6 flex items-center justify-between border-b-2 border-gray-100">
          <button onClick={() => setQuizMode(false)} className="text-3xl text-gray-400 hover:text-gray-600 font-bold transition-colors">✕</button>
          <div className="flex-1 mx-8 h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-1/3 transition-all duration-500" />
          </div>
          <div className="text-purple-600 font-black">1/3</div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-10">
          <span className="text-8xl animate-bounce">🤔</span>
          <div className="text-center space-y-4 max-w-lg">
            <h2 className="text-3xl font-black text-gray-800">Knowledge Check: {selectedItem.title}</h2>
            <p className="text-xl font-bold text-gray-500 leading-relaxed">
              Based on the content you just explored, which of these is the most significant takeaway?
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            {["Answer Option A", "Answer Option B", "Answer Option C"].map((opt, i) => (
              <button 
                key={i} 
                onClick={() => { alert("Correct! Great job."); setQuizMode(false); }}
                className="p-5 border-2 border-gray-100 rounded-2xl font-black text-gray-600 hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-16 animate-in fade-in slide-in-from-bottom duration-500 pb-32">
      <div className="text-left space-y-4">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">Culture Explorer</h1>
        <p className="text-lg text-gray-500 font-bold mt-1 max-w-2xl">
          Deepen your learning by discovering the cultural soul behind the language.
        </p>
      </div>

      <div className="space-y-20">
        {categories.map(renderSection)}
      </div>

      {/* Full-Screen End-to-End Detail View */}
      {selectedItem && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[200] bg-white overflow-hidden flex flex-col animate-in fade-in duration-300">
          {/* Header Bar - Truly pinned to top without margins */}
          <div className="w-full bg-white border-b-2 border-gray-50 px-4 py-3 md:px-8 md:py-4 flex items-center justify-between sticky top-0 z-[210]">
            <div className="flex items-center gap-5">
              {/* Back Arrow Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 hover:bg-gray-100 rounded-2xl flex items-center justify-center text-xl transition-all shadow-sm active:scale-90"
              >
                ←
              </button>
              
              {/* Title and Category Left-Aligned */}
              <div className="flex flex-col">
                <span className="text-[9px] md:text-[10px] font-black text-[#ad46ff] uppercase tracking-[0.2em] leading-none mb-1">
                  {'category' in selectedItem ? (selectedItem as CultureItem).category : 'Art & Masterpieces'}
                </span>
                <h2 className="text-base md:text-xl font-black text-gray-800 leading-tight truncate max-w-[150px] sm:max-w-xs md:max-w-lg">
                  {selectedItem.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
            <div className="flex flex-col lg:flex-row min-h-full">
              
              {/* Left Side: Media Gallery */}
              <div className="lg:w-2/3 p-4 md:p-10 space-y-8 lg:border-r-2 border-gray-100 bg-gray-50/20">
                {(!('assets' in selectedItem) || !selectedItem.assets || selectedItem.assets.length === 0) ? (
                   <div className="w-full rounded-[2rem] overflow-hidden border-2 border-gray-100 shadow-xl bg-white animate-in zoom-in duration-500">
                     <img 
                       src={'author' in selectedItem ? selectedItem.imageUrl : (selectedItem as CultureItem).thumbnailUrl} 
                       className="w-full object-contain max-h-[75vh]" 
                       alt={selectedItem.title} 
                     />
                   </div>
                ) : (
                  <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                    {(selectedItem as CultureItem).assets?.map((asset, idx) => renderAsset(asset, idx))}
                  </div>
                )}
                
                {(!('assets' in selectedItem) || !selectedItem.assets?.length) && 'mediaUrl' in selectedItem && (selectedItem as any).mediaUrl && (
                  <div className="pt-4 flex justify-center">
                    <a 
                      href={(selectedItem as any).mediaUrl as string} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-white border-2 border-gray-200 text-[#ad46ff] p-5 px-10 rounded-3xl font-black shadow-[0_6px_0_#f3f4f6] hover:bg-gray-50 active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest text-xs"
                    >
                      <span>📺</span> EXPLORE EXTERNAL CONTENT
                    </a>
                  </div>
                )}
              </div>

              {/* Right Side: Text Information */}
              <div className="lg:w-1/3 p-8 md:p-12 space-y-10 bg-white">
                <div className="space-y-4">
                  <span className="px-3 py-1 bg-purple-50 text-[#ad46ff] rounded-full text-[11px] font-black uppercase tracking-widest">
                    Information
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight tracking-tight">
                    {selectedItem.title}
                  </h1>
                  {'author' in selectedItem && <p className="text-xl font-bold text-gray-500">by {selectedItem.author}</p>}
                  {'subtitle' in selectedItem && selectedItem.subtitle && (
                    <p className="text-xl font-bold text-purple-400 leading-tight">{selectedItem.subtitle}</p>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="h-1.5 w-16 bg-purple-100 rounded-full" />
                  <p className="text-gray-600 text-lg md:text-xl font-bold leading-relaxed whitespace-pre-line">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="pt-10 border-t-2 border-gray-50 space-y-8">
                  <div className="flex items-start gap-4 p-5 bg-yellow-50 rounded-2xl border border-yellow-100">
                     <span className="text-3xl">💡</span>
                     <p className="text-sm font-bold text-yellow-700 leading-relaxed">
                        Use the Quiz tool to verify your cultural knowledge and earn extra bonus gems!
                     </p>
                  </div>
                  <button 
                    onClick={() => setQuizMode(true)}
                    className="w-full p-6 bg-[#ad46ff] text-white rounded-3xl font-black shadow-[0_8px_0_#8439a3] hover:bg-[#8439a3] active:translate-y-2 active:shadow-none transition-all uppercase tracking-[0.2em] text-sm"
                  >
                    START CULTURAL QUIZ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CultureView;
