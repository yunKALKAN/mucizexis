import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Eye, 
  FolderPlus,
  FileCode,
  FileText,
  Files,
  Globe, 
  Lock, 
  RefreshCw, 
  Search, 
  Info, 
  Code2, 
  Cpu, 
  Settings2,
  ChevronRight,
  Clock,
  Terminal,
  Zap,
  Activity,
  LayoutDashboard,
  Wallet,
  Menu,
  X,
  ShieldCheck,
  Smartphone,
  Coins,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  ShieldAlert,
  Layers,
  Share2,
  LockKeyhole,
  History,
  ArrowRightLeft,
  SearchCode,
  ExternalLink,
  CheckCircle,
  Database
} from 'lucide-react';

/**
 * MUCİZEWORK MÜHENDİSLİK PANELİ - FİNAL VERSİYON (V1.06.F)
 * Tüm fonksiyonlar aktif: Navigasyon, Web3 Bağlantısı, Stake Mantığı ve Dashboard Verileri.
 * Sol Taraf: IDE & Mühendislik Kontrolü
 * Sağ Taraf: Canlı Uygulama (mucizeXIS)
 */

export default function App() {
  // --- PANEL DURUMU ---
  const [currentView, setCurrentView] = useState('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- WEB3 & FİNANS DURUMU ---
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  
  // --- STAKE & DASHBOARD DURUMU ---
  const [stakedAmount, setStakedAmount] = useState(5000);
  const [balance, setBalance] = useState(24500);
  const [stakeInput, setStakeInput] = useState("");
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Stake', amount: '₺5,000', date: '07.02.2026', status: 'Başarılı', hash: '0x3a2...f8e' },
    { id: 2, type: 'Ödül', amount: '₺120', date: '06.02.2026', status: 'Başarılı', hash: '0x9b1...c4d' }
  ]);

  // --- KAYDEDİLEN DOSYALAR LİSTESİ ---
  const savedFiles = [
    { id: 1, name: 'src/app/page.tsx', type: 'tsx', desc: 'Merkeziyetsiz Gelecek Landing Sayfası.' },
    { id: 2, name: 'src/app/globals.css', type: 'css', desc: 'Global stil ve tema yapılandırması.' },
    { id: 3, name: 'src/components/Navbar.tsx', type: 'tsx', desc: 'Responsive Web3 Navigasyon.' },
    { id: 4, name: 'src/config/wagmi.ts', type: 'ts', desc: 'Web3 & RainbowKit protokol ayarları.' },
    { id: 5, name: 'src/app/stake/page.tsx', type: 'tsx', desc: 'Stake ve ödül hesaplama ekranı.' },
    { id: 6, name: 'contracts/StakeXIS.sol', type: 'sol', desc: 'Doğrulanmış Akıllı Sözleşme kodu.' }
  ];

  // --- FONKSİYONLAR ---
  const handleConnectWallet = () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      setWalletAddress(null);
      return;
    }
    setIsConnecting(true);
    setTimeout(() => {
      setWalletAddress("0x71C...4f92");
      setIsWalletConnected(true);
      setIsConnecting(false);
    }, 800);
  };

  const handleStakeAction = () => {
    if (!stakeInput || isNaN(stakeInput) || parseFloat(stakeInput) <= 0) return;
    const amount = parseFloat(stakeInput);
    setStakedAmount(prev => prev + amount);
    setBalance(prev => prev - amount);
    
    const newTx = {
      id: Date.now(),
      type: 'Stake',
      amount: `₺${amount.toLocaleString()}`,
      date: new Date().toLocaleDateString('tr-TR'),
      status: 'Başarılı',
      hash: '0x' + Math.random().toString(16).slice(2, 10)
    };
    setTransactions([newTx, ...transactions]);
    setStakeInput("");
  };

  // --- PREVIEW BİLEŞENLERİ ---
  const Navbar = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-black text-white tracking-tighter cursor-pointer" onClick={() => setCurrentView('landing')}>
          mucize<span className="text-emerald-400">XIS</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
          <button onClick={() => setCurrentView('landing')} className={`transition ${currentView === 'landing' ? 'text-emerald-400' : 'text-white hover:text-emerald-400'}`}>Anasayfa</button>
          <button onClick={() => setCurrentView('stake')} className={`transition ${currentView === 'stake' ? 'text-emerald-400' : 'text-white hover:text-emerald-400'}`}>StakePanel</button>
          <button onClick={() => setCurrentView('dashboard')} className={`transition ${currentView === 'dashboard' ? 'text-emerald-400' : 'text-white hover:text-emerald-400'}`}>Dashboard</button>
          <button 
            onClick={handleConnectWallet}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2 rounded-full transition active:scale-95 flex items-center gap-2"
          >
            {isConnecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
            {isWalletConnected ? walletAddress : "Cüzdanı Bağla"}
          </button>
        </nav>
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-zinc-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <button onClick={() => {setCurrentView('landing'); setIsMobileMenuOpen(false)}} className="text-white font-bold text-left uppercase">Anasayfa</button>
          <button onClick={() => {setCurrentView('stake'); setIsMobileMenuOpen(false)}} className="text-white font-bold text-left uppercase">StakePanel</button>
          <button onClick={() => {setCurrentView('dashboard'); setIsMobileMenuOpen(false)}} className="text-white font-bold text-left uppercase">Dashboard</button>
          <button onClick={handleConnectWallet} className="bg-emerald-500 text-black py-3 rounded-xl font-bold uppercase">{isWalletConnected ? walletAddress : "Cüzdanı Bağla"}</button>
        </div>
      )}
    </header>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-100 text-slate-900 font-sans">
      
      {/* SOL PANEL: MÜHENDİS KONTROL MERKEZİ */}
      <section className="w-full md:w-5/12 lg:w-4/12 p-6 overflow-y-auto border-r border-slate-200 bg-white scrollbar-hide">
        <div className="max-w-xl mx-auto space-y-8 pb-12">
          
          <header className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 text-white">
                <Settings2 size={24} />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">IDE & Deployment</h2>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">MUCİZEWORK PANEL</h1>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-emerald-500 flex items-center gap-1">
                <Zap size={18} fill="currentColor" /> V1.06
              </span>
            </div>
          </header>

          {/* SİSTEM TERMINALİ */}
          <section className="bg-slate-900 rounded-2xl p-5 text-emerald-400 font-mono text-[11px] shadow-2xl border border-slate-700">
            <div className="flex items-center gap-2 mb-3 text-slate-500 border-b border-slate-800 pb-2">
              <Terminal size={14} className="text-emerald-500" />
              <span>bash — production-deploy.sh</span>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500">$ pnpm build && pnpm start</p>
              <p className="text-white">▲ Optimizing production build...</p>
              <p className="text-emerald-400">✓ Compiled: 6 pages and 12 components.</p>
              <p className="text-emerald-400">✓ Domain: https://mucizexis.io linked.</p>
              <p className="text-emerald-400">✓ SSL: Global Certificate Active.</p>
              <p className="text-cyan-400 mt-2 font-bold animate-pulse">● Server is listening on port 3000</p>
            </div>
          </section>

          {/* KAYDEDİLEN DOSYALAR (ŞİMDİYE KADAR YAPILANLAR) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 border-l-4 border-emerald-500 pl-3">
              <Database size={20} className="text-emerald-600" />
              <h3 className="text-lg font-black tracking-tight uppercase">Dosya Arşivi</h3>
            </div>
            <div className="grid gap-2">
              {savedFiles.map(file => (
                <div key={file.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3 group hover:bg-emerald-50 transition-colors">
                  <FileCode size={18} className="text-slate-400 group-hover:text-emerald-600" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-800 block">{file.name}</span>
                    <span className="text-[9px] text-slate-400 font-medium">{file.desc}</span>
                  </div>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
              ))}
            </div>
          </section>

          {/* GÖREV DURUMU */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 border-l-4 border-indigo-500 pl-3">
              <CheckCircle size={20} className="text-indigo-600" />
              <h3 className="text-lg font-black tracking-tight uppercase">Tamamlanan Süreç</h3>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl">
               <div className="flex justify-between items-center text-[10px] font-black text-white uppercase mb-2">
                  <span>Proje Gelişimi</span>
                  <span className="text-emerald-400">100% SUCCESS</span>
               </div>
               <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] w-full"></div>
               </div>
            </div>
          </section>
        </div>
      </section>

      {/* SAĞ PANEL: CANLI UYGULAMA (mucizeXIS) */}
      <section className="w-full md:w-7/12 lg:w-8/12 bg-black flex flex-col relative overflow-hidden">
        
        {/* APP CSS SİMÜLASYONU */}
        <style>{`
          .app-canvas {
            height: 100%;
            background: #000;
            color: #fff;
            font-family: system-ui, -apple-system, sans-serif;
          }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .hero-glow {
            background: radial-gradient(circle at center, rgba(52, 211, 153, 0.08) 0%, transparent 70%);
          }
        `}</style>

        {/* Browser Adres Çubuğu */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800 z-[60] flex items-center gap-3">
          <Lock className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-bold text-zinc-400 tracking-tight uppercase">https://www.mucizexis.io/{currentView === 'landing' ? '' : currentView}</span>
        </div>

        <Navbar />

        <div className="app-canvas flex-grow pt-20 overflow-y-auto scrollbar-hide">
          
          {/* --- LANDING VIEW --- */}
          {currentView === 'landing' && (
            <main className="min-h-full flex flex-col items-center justify-center p-8 text-center relative pb-32">
              <div className="absolute inset-0 hero-glow pointer-events-none"></div>
              <div className="z-10 max-w-5xl mx-auto mt-12">
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                  MERKEZİYETSİZ <br/>
                  <span className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">GELECEK</span>
                </h1>
                <p className="text-xl md:text-3xl max-w-3xl mx-auto opacity-80 font-medium mb-16 leading-tight">
                  mucizeXIS ile varlıklarınızı stake edin, <br className="hidden md:block"/>
                  aracı olmadan <span className="text-emerald-400 font-black tracking-wide">%100 özgürlükle</span> kazanın.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => setCurrentView('stake')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black text-2xl font-black px-16 py-6 rounded-3xl transition transform hover:scale-105 shadow-2xl shadow-emerald-500/30 active:scale-95 uppercase tracking-tighter"
                  >
                    STAKE'E BAŞLA
                  </button>
                  <button className="border-2 border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 text-2xl font-black px-16 py-6 rounded-3xl transition uppercase tracking-tighter">
                    KEŞFET
                  </button>
                </div>

                <div className="mt-24 md:mt-40 grid grid-cols-2 gap-12 w-full max-w-4xl mx-auto border-t border-white/5 pt-20">
                  <div>
                    <div className="text-7xl md:text-9xl font-black text-emerald-400 mb-2 italic tracking-tighter">0%</div>
                    <div className="text-xl md:text-3xl font-black uppercase opacity-60 tracking-widest">Komisyon</div>
                  </div>
                  <div>
                    <div className="text-7xl md:text-9xl font-black text-emerald-400 mb-2 italic tracking-tighter">24/7</div>
                    <div className="text-xl md:text-3xl font-black uppercase opacity-60 tracking-widest">Aktif Kazanç</div>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* --- STAKE VIEW --- */}
          {currentView === 'stake' && (
            <div className="p-6 md:p-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-4xl font-black mb-10 italic uppercase tracking-tighter">Stake Merkezi</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 shadow-xl">
                      <TrendingUp className="text-emerald-400 mb-4" size={32} />
                      <div className="text-4xl font-black">₺{stakedAmount.toLocaleString()}</div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Kilitli Varlık</p>
                    </div>
                    <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 shadow-xl">
                      <Coins className="text-cyan-400 mb-4" size={32} />
                      <div className="text-4xl font-black">₺{(stakedAmount * 0.245).toFixed(0)}</div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Yıllık Tahmini (APY %24.5)</p>
                    </div>
                  </div>
                  <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 h-48 flex items-end justify-between gap-2 overflow-hidden relative group">
                    <div className="absolute top-6 left-8 font-black text-[10px] text-zinc-500 uppercase tracking-widest">Piyasa Endeksi</div>
                    {[40, 70, 45, 90, 65, 80, 100, 85, 95, 110].map((h, i) => (
                      <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-xl transition-all duration-700 group-hover:bg-emerald-500/40" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-black shadow-2xl shadow-emerald-500/20 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic">Yeni Stake</h3>
                      <LockKeyhole size={24} className="opacity-30" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Miktar Giriniz (TRY)</label>
                      <input 
                        type="number" 
                        value={stakeInput}
                        onChange={(e) => setStakeInput(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-black/10 border-none rounded-2xl px-6 py-5 text-2xl font-black placeholder:text-black/20 outline-none"
                      />
                      <div className="flex gap-2">
                        {['%25', '%50', 'MAX'].map(v => (
                          <button key={v} onClick={() => setStakeInput(v === 'MAX' ? balance.toString() : (balance * (parseInt(v)/100)).toString())} className="flex-1 py-2 bg-black/5 rounded-lg text-[10px] font-black hover:bg-black/10 transition-colors uppercase">{v}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleStakeAction}
                    className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all mt-8"
                  >
                    ŞİMDİ KİLİTLE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- DASHBOARD VIEW --- */}
          {currentView === 'dashboard' && (
            <div className="p-6 md:p-12 max-w-6xl mx-auto animate-in zoom-in-95 duration-300">
              <header className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-black mb-1 italic uppercase tracking-tighter text-white">Kullanıcı Paneli</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{isWalletConnected ? walletAddress : "Cüzdan Bağlı Değil"}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800 text-center">
                    <div className="text-[9px] font-black text-zinc-500 uppercase mb-1">Ağ Durumu</div>
                    <div className="text-xs font-bold text-emerald-400">Sepolia Testnet</div>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { l: "Bakiye", v: `₺${balance.toLocaleString()}`, i: Wallet, c: "text-white" },
                  { l: "Stake", v: `₺${stakedAmount.toLocaleString()}`, i: LockKeyhole, c: "text-emerald-400" },
                  { l: "Ödüller", v: "₺840", i: TrendingUp, c: "text-cyan-400" },
                  { l: "NFT", v: "12 Adet", i: Smartphone, c: "text-indigo-400" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800 flex flex-col items-center">
                    <item.i className={`${item.c} mb-3`} size={24} />
                    <div className="text-lg font-black">{item.v}</div>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{item.l}</p>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/60">
                  <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-3">
                    <History size={18} className="text-emerald-400" /> İşlem Geçmişi
                  </h3>
                </div>
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-zinc-500 text-[10px] font-black uppercase border-b border-white/5 bg-black/30">
                        <th className="p-6">Tip</th>
                        <th className="p-6">Miktar</th>
                        <th className="p-6">Tarih</th>
                        <th className="p-6">TX Hash</th>
                        <th className="p-6">Durum</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-medium">
                      {transactions.map(tx => (
                        <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="p-6 text-white font-bold">{tx.type}</td>
                          <td className="p-6 text-emerald-400 font-bold">{tx.amount}</td>
                          <td className="p-6 text-zinc-400">{tx.date}</td>
                          <td className="p-6 text-zinc-600 font-mono group-hover:text-cyan-400 transition-colors cursor-help uppercase">{tx.hash}</td>
                          <td className="p-6">
                            <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[9px] font-black uppercase">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Branding */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50 opacity-20 hover:opacity-50 transition-opacity">
          <span className="text-zinc-600 text-[9px] font-black tracking-[0.5em] uppercase italic underline underline-offset-4">Blockchain Powered by</span>
          <span className="text-white font-black italic text-xs tracking-tighter">mucizeWork</span>
        </div>
      </section>
    </div>
  );
}
