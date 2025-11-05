import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, MapPin, Link as LinkIcon, Briefcase, Radio, Users, Zap, MessageSquare, BarChart, X, Globe, Send } from 'lucide-react';

// --- 多语言内容 (保持不变) ---
const translations = {
    en: {
        navHome: "Home",
        navService: "Service",
        navAMA: "AMA",
        navEvent: "Event",
        contactUs: "Contact Us",
        heroTitle: "We are not just a media",
        heroSubtitle: "but also a node connector for you to move towards the future.",
        exposure: "Exposure",
        kols: "KOLs",
        cases: "Cases",
        serviceOverview: "Service Overview",
        services: [
                "Bilingual Twitter Space Interviews", "Customized Web3 Business Trips", "Compliance Consulting and Support",
                "Web3 Industry Summit", "Full-process Project Incubation Services", "Platform Token Issuance and Listing Support"
        ],
        detailedServices: [
                { title: "Bilingual Twitter Space Interviews", description: "TreeFinance leverages the advantages of X Space voice live streaming and, through collaboration with KOLs, media, and communities to create an efficient closed loop from 'exposure → traffic → conversion,' helping brands quickly build awareness, amplify their presence, and engage more closely with communities and potential users." },
                { title: "Customized business trips", description: "TreeFinance excels at integrating industry conferences with offline resources, organizing domestic and international Web3-themed business trips that combine inspections, networking, and content creation to foster stronger industry connections and collaboration opportunities. Current routes include the Mamba Route (Africa), Bali (Indonesia), and Nha Trang (Vietnam)." },
                { title: "Compliance licensing consulting and support", description: "TreeFinance precisely matches license types to business scenarios based on relevant regulations. Our expert team provides end-to-end support, ensuring compliance with personnel and technical requirements. We tailor compliance strategies, including risk assessment, and system development. Our process encompasses initial consultation, customized solutions, document preparation, filing coordination, and ongoing support. These efficient services help businesses navigate compliance challenges and advance Web3 adoption." },
                { title: "Web3 Industry Summit", description: "TreeFinance customizes high-end blockchain summits domestically and internationally, connecting partners with project teams, investment institutions, and global ecosystem resources to create an efficient, private, and results-driven industry exchange platform." },
                { title: "Full-process project incubation services", description: "TreeFinance's incubation services span the entire project lifecycle, offering three key advantages: a comprehensive media, compliance, and resource framework; customized solutions; and long-term support. These services enable startups and established projects to transform innovative ideas into high-quality projects, driving growth and value in the Web3 ecosystem." },
                { title: "Platform token issuance and inclusion support", description: "Our listing services include matching with trading platforms, pre-qualification, coaching, coordination, communication, and post-listing support. Indexing services cover multiple authoritative platforms, optimizing materials, filing, and maintaining information. This service offers three key advantages: extensive resource networks, professional compliance oversight, and integrated listing and dissemination support. These streamline processes, reduce costs, and enhance efficiency, helping startups and established projects integrate into the Web3 ecosystem, boosting asset liquidity and brand visibility" }
        ],
        resources: [
                { title: "Project Collaboration", description: "Serving and managing over 80 Web3 projects, providing targeted operational guidance, GameFi & DeFi Alpha strategies, and more." },
                { title: "Media Resources", description: "Committee with over 200 Chinese and English media outlets, covering all blockchain-focused media channels." },
                { title: "KOL Resources", description: "Partnered with over 200 top Web3 KOLs and community influencers, providing in-depth overseas project promotion." },
                { title: "Event Resources", description: "We have established extensive connections in Hong Kong, Japan, Korea, and more, capable of hosting various online and offline events, including closed-door meetings and summits." },
                { title: "Community Users", description: "More than 30 owned and partnered communities, reaching over 100,000 users." },
        ],
        amaTitle: "AMA",
                amaEvents: [
                                {
                                        title: "Trust Game of On-Chain Oracles: How to Make Blockchain Perceive the Real World?",
                                        date: "September 7 8:00pm UTC+8",
                                        location: "123 Main Street, Apt 48, Anytown, CA 90210, USA",
                                        language: 'Chinese',
                                        listeningVolume: '19W',
                                        listeningLink: 'https://x.com/i/spaces/1yNGabzBWevJj',
                                        image: 'ama-event/ama-event-1.jpg'
                                },
                                {
                                        title: "Memecoin Momentum: Harnessing AI to Boost Trading Volume and Community Engagement",
                                        date: "September 17 8:00pm UTC+8",
                                        location: "123 Main Street, Apt 48, Anytown, CA 90210, USA",
                                        language: 'English',
                                        listeningVolume: '13.3W',
                                        listeningLink: 'https://x.com/i/spaces/1BdxYZmLwDYKX',
                                        image: 'ama-event/ama-event-2.jpg'
                                }
                ],
        amaPhotoWall: "AMA Photo Wall",
        labelLanguage: 'Language:',
        labelListeningVolume: 'Listening volume:',
        labelListeningLink: 'Listening link:',
        videoReview: "Video review of China tour",
        footerTitle: "We're creating new possibilities\nfor Web3.",
        footerButtonX: "@TreefinanceCN",
        footerButtonTG: "@TreefinanceCN",
    },
    cn: {
        navHome: "Home",
        navService: "服务",
        navAMA: "AMA",
        navEvent: "活动",
        contactUs: "联系我们",
        heroTitle: "我们不仅仅是媒体",
        heroSubtitle: "更是您迈向未来的节点连接器。",
        exposure: "曝光量",
        kols: "KOLs",
        cases: "合作案例",
        serviceOverview: "服务总览",
        services: [
                "双语 Twitter Space 访谈", "定制化 Web3 商务差旅", "合规咨询与支持",
                "Web3 行业峰会", "全流程项目孵化服务", "平台代币发行与上市支持"
        ],
        detailedServices: [
        {
            title: "双语 Twitter Space 访谈",
            description: "TreeFinance 利用 X Space 语音直播优势，通过与 KOL、媒体和社区的合作，打造“曝光 → 流量 → 转化”的高效闭环，帮助品牌快速建立知名度，扩大影响力，并与社区和潜在用户建立更紧密的联系。"
        },
        {
            title: "定制化商务考察",
            description: "TreeFinance 擅长将行业会议与线下资源相结合，组织国内外 Web3 主题商务考察，将考察、交流和内容创作融为一体，以促进更强的行业联系和合作机会。当前路线包括 Mamba 路线（非洲）、巴厘岛（印度尼西亚）和芽庄（越南）。"
        },
        {
            title: "合规牌照咨询与支持",
            description: "TreeFinance 根据相关法规，精准匹配牌照类型与业务场景。我们的专家团队提供端到端的支持，确保符合人员和技术要求。我们量身定制合规策略，包括风险评估和系统开发。我们的流程涵盖初步咨询、定制解决方案、文件准备、备案协调和持续支持。这些高效服务帮助企业应对合规挑战，推动 Web3 的普及。"
        },
        {
            title: "Web3 行业峰会",
            description: "TreeFinance 在国内外定制高端区块链峰会，将合作伙伴与项目团队、投资机构和全球生态系统资源连接起来，打造一个高效、私密、以结果为导向的行业交流平台。"
        },
        {
            title: "全流程项目孵化服务",
            description: "TreeFinance 的孵化服务涵盖整个项目生命周期，提供三大核心优势：全面的媒体、合规和资源框架；定制化解决方案；以及长期支持。这些服务使初创公司和成熟项目能够将创新理念转化为高质量项目，推动 Web3 生态系统的增长和价值。"
        },
        {
            title: "平台代币发行与收录支持",
            description: "我们的上市服务包括与交易平台的匹配、预审、辅导、协调、沟通和上市后支持。收录服务涵盖多个权威平台，优化材料、备案和信息维护。该服务提供三大核心优势：广泛的资源网络、专业的合规监督以及集成的上市和传播支持。这些服务简化了流程，降低了成本，提高了效率，帮助初创公司和成熟项目融入 Web3 生态系统，提升资产流动性和品牌知名度。"
        }   ],
        resources: [
                { title: "项目合作", description: "服务和管理超过80个Web3项目，提供有针对性的运营指导、GameFi & DeFi Alpha策略等。" },
                { title: "媒体资源", description: "与超过200家中英文媒体建立合作，覆盖所有专注于区块链的媒体渠道。" },
                { title: "KOL 资源", description: "与超过200位顶尖Web3 KOL和社区影响者合作，提供深度的海外项目推广。" },
                { title: "活动资源", description: "我们在香港、日本、韩国等地建立了广泛的联系，能够举办各种线上线下活动，包括闭门会议和峰会。" },
                { title: "社区用户", description: "拥有并合作超过30个社区，覆盖用户超过10万。" },
        ],
        amaTitle: "AMA",
                amaEvents: [
                                {
                                        title: "链上预言机的信任博弈：区块链如何感知现实世界？",
                                        date: "9月7日晚8:00（UTC+8）",
                                        location: "美国加州洛杉矶市ANYTOWN主街123号48室",
                                        language: '中文',
                                        listeningVolume: '19W',
                                        listeningLink: 'https://x.com/i/spaces/1yNGabzBWevJj',
                                        image: 'ama-event/ama-event-1.jpg'
                                },
                                {
                                        title: "Memecoin 势头：利用人工智能提升交易量和社区参与度",
                                        date: "9月17日晚8:00（UTC+8）",
                                        location: "美国加州洛杉矶市ANYTOWN主街123号48室",
                                        language: '英文',
                                        listeningVolume: '13.3W',
                                        listeningLink: 'https://x.com/i/spaces/1BdxYZmLwDYKX',
                                        image: 'ama-event/ama-event-2.jpg'
                                }
                ],
        amaPhotoWall: "AMA 照片墙",
        labelLanguage: '语言：',
        labelListeningVolume: '收听量：',
        labelListeningLink: '收听链接：',
        videoReview: "中国行视频回顾",
        footerTitle: "我们正在为 Web3\n创造新的可能性。",
        footerButtonX: "@TreefinanceCN",
        footerButtonTG: "@TreefinanceCN",
    }
};

// --- 动画变体定义 ---
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };
const cardVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } } };

// --- 可复用组件 ---
const AnimatedSection = ({ children, className = '', id = '' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => { if (inView) { controls.start('visible'); } }, [controls, inView]);
  return (
    <motion.section id={id} ref={ref} className={`py-16 md:py-24 relative overflow-hidden ${className}`} variants={containerVariants} initial="hidden" animate={controls}>
      {children}
    </motion.section>
  );
};

// 可复用的区块背景（增强版多光团）
const SectionBg = ({ styleOverrides = {} }) => (
    <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        ...styleOverrides.container,
    }}>
        {/* 主大绿光团 */}
        <div style={{
            position: 'absolute',
            left: '3%',
            top: '6%',
            width: 'min(480px, 60vw)',
            height: 'min(480px, 60vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #22c55e 40%, #b7e17a 65%, #e6ed93 100%)',
            opacity: 0.36,
            filter: 'blur(92px)',
            transform: 'translateZ(0)',
            zIndex: 0,
            ...styleOverrides.blob1,
        }} />
        {/* 右上黄绿渐变光团 */}
        <div style={{
            position: 'absolute',
            right: '4%',
            top: '2%',
            width: 'min(340px, 50vw)',
            height: 'min(340px, 50vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 70% 30%, #4ade80 45%, #c7f7b9 75%, rgba(255,255,220,0.9) 100%)',
            opacity: 0.26,
            filter: 'blur(64px)',
            transform: 'translateZ(0)',
            zIndex: 0,
            ...styleOverrides.blob2,
        }} />
        {/* 中下漂浮绿黄光团 */}
        <div className="floating-blob" style={{
            position: 'absolute',
            left: '20%',
            bottom: '8%',
            width: 'min(360px, 60vw)',
            height: 'min(360px, 60vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 60%, #9be15d 20%, #dbeaa3 60%, rgba(255,248,220,0.95) 100%)',
            opacity: 0.22,
            filter: 'blur(72px)',
            zIndex: 0,
            mixBlendMode: 'screen',
            ...styleOverrides.blob3,
        }} />
        {/* 右下漂浮淡绿光团 */}
        <div className="floating-blob slow" style={{
            position: 'absolute',
            right: '18%',
            bottom: '18%',
            width: 'min(260px, 45vw)',
            height: 'min(260px, 45vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 60% 40%, #6ee7b7 30%, #f5f7c3 75%)',
            opacity: 0.18,
            filter: 'blur(56px)',
            zIndex: 0,
            mixBlendMode: 'screen',
            ...styleOverrides.blob4,
        }} />
        {/* 新增左下角小黄绿光团 */}
        <div className="floating-blob fast" style={{
            position: 'absolute',
            left: '8%',
            bottom: '10%',
            width: 'min(180px, 35vw)',
            height: 'min(180px, 35vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 60% 60%, #e6ed93 40%, #bbf7d0 100%)',
            opacity: 0.13,
            filter: 'blur(40px)',
            zIndex: 0,
            mixBlendMode: 'screen',
        }} />
        {/* 新增顶部中央淡黄光团 */}
        <div className="floating-blob" style={{
            position: 'absolute',
            left: '40%',
            top: '-6%',
            width: 'min(220px, 40vw)',
            height: 'min(220px, 40vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 30%, #f7f7b9 40%, #e6ed93 100%, transparent 100%)',
            opacity: 0.10,
            filter: 'blur(60px)',
            zIndex: 0,
            mixBlendMode: 'screen',
        }} />
    </div>
);
// --- 页面主要组件 ---

const Header = ({ language, setLanguage, t }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
  const navLinks = [{ key: 'navHome', href: '#home'}, { key: 'navService', href: '#service' }, { key: 'navAMA', href: '#ama' }, { key: 'navEvent', href: '#event' }];
  
  const toggleLanguage = () => {
    setLanguage(lang => (lang === 'en' ? 'cn' : 'en'));
  };
    const contactRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (contactRef.current && !contactRef.current.contains(e.target)) {
                setIsContactOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 px-4 md:px-8 lg:px-12 bg-white/30 backdrop-blur-lg border border-white/20 rounded-b-2xl">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                                <img
                                    src={language === 'cn' ? '/logo3.png' : '/logo1.png'}
                                    alt="Tree Finance Logo"
                                    className="h-10 md:h-[72px] w-auto transition-all duration-300"
                                    style={{ width: 'auto', transform: 'scale(2)', transformOrigin: 'left center', display: 'inline-block' }}
                                />
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.key} href={link.href} className="text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium relative group text-lg md:text-xl lg:text-2xl">
                            {t[link.key]}
                            <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>
                <div className="hidden md:flex items-center space-x-4" ref={contactRef}>
                    <button onClick={toggleLanguage} aria-label="切换语言" className="flex items-center text-gray-700 hover:text-green-600 transition-colors bg-transparent px-3 py-2 rounded-full border border-gray-300/50 hover:border-green-400/50">
                        <Globe size={20} />
                        <span className="ml-2 font-medium text-sm md:text-base">{language === 'en' ? 'EN' : 'CN'}</span>
                    </button>
                    <div className="relative">
                        <button onClick={() => setIsContactOpen(s => !s)} aria-haspopup="true" aria-expanded={isContactOpen} className="flex items-center bg-green-500 text-white font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-green-500/20 text-sm md:text-base">
                            {t.contactUs}
                        </button>
                        {isContactOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl p-3 text-left z-50" role="menu" aria-label="Contact options">
                                <a href="https://t.me/BIGBIGNONO" target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-800">
                                    <Send size={16} className="text-blue-500 mr-3" />
                                    <span>Martin</span>
                                </a>
                                <a href="https://t.me/Elma_R09" target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-800">
                                    <Send size={16} className="text-blue-500 mr-3" />
                                    <span>Elma</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                        {isMenuOpen ? <X size={28}/> : <BarChart size={28} className='-rotate-90'/>}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <motion.div className="md:hidden absolute top-full left-0 w-full bg-white/80 backdrop-blur-md shadow-lg py-4 rounded-b-2xl" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <nav className="flex flex-col items-center space-y-4">
                        {navLinks.map((link) => <a key={link.key} href={link.href} className="text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium text-lg" onClick={() => setIsMenuOpen(false)}>{t[link.key]}</a>)}
                        <button onClick={toggleLanguage} className="text-gray-700 font-medium text-base">{language === 'en' ? '切换到中文' : 'Switch to English'}</button>
                        <div className="w-full flex flex-col items-center">
                            <motion.a href="#" onClick={(e) => { e.preventDefault(); setIsContactOpen(s => !s); }} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full text-base" whileHover={{ scale: 1.05 }}>{t.contactUs}</motion.a>
                            {isContactOpen && (
                                <div className="mt-3 w-3/4 bg-white rounded-xl shadow-md p-3 text-center">
                                    <a href="https://t.me/BIGBIGNONO" onClick={(e) => { e.preventDefault(); window.open('https://t.me/BIGBIGNONO', '_blank', 'noopener,noreferrer'); setIsMenuOpen(false); setIsContactOpen(false); }} className="flex items-center justify-center px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-800">
                                        <Send size={16} className="text-blue-500 mr-2" />
                                        <span>Martin</span>
                                    </a>
                                    <a href="https://t.me/Elma_R09" onClick={(e) => { e.preventDefault(); window.open('https://t.me/Elma_R09', '_blank', 'noopener,noreferrer'); setIsMenuOpen(false); setIsContactOpen(false); }} className="flex items-center justify-center px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-800">
                                        <Send size={16} className="text-blue-500 mr-2" />
                                        <span>Elma</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </nav>
                </motion.div>
            )}
        </header>
    );
};

const HeroSection = ({ t }) => (
    <AnimatedSection id="home" className="pt-10 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-4 relative z-10">
            <SectionBg />
            {/* Particle background removed */}
            <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Responsive hero text: allow wrapping on small screens and use responsive font sizes */}
                    <div
                        className="text-center md:text-left"
                        style={{
                            maxWidth: '100%',
                            width: '100%',
                            whiteSpace: 'normal',
                            overflow: 'visible',
                            zIndex: 2,
                            position: 'relative',
                        }}
                    >
                        <motion.h1
                            className="text-6xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400 leading-tight mx-auto md:mx-0"
                            style={{
                                maxWidth: '100%',
                                width: '100%',
                                letterSpacing: '0.01em',
                                wordBreak: 'break-word',
                                whiteSpace: 'normal',
                                overflow: 'visible',
                            }}
                            variants={itemVariants}
                        >
                            {t.heroTitle}
                        </motion.h1>
                        <motion.p
                            className="mt-4 text-base sm:text-lg md:text-2xl text-gray-600 font-medium"
                            style={{
                                whiteSpace: 'normal',
                                overflow: 'visible',
                                maxWidth: '100%',
                            }}
                            variants={itemVariants}
                        >
                            {t.heroSubtitle}
                        </motion.p>
                        <motion.div className="mt-12 flex justify-center md:justify-start space-x-8 md:space-x-12" variants={containerVariants}>
                            <motion.div variants={itemVariants} className="text-center"><p className="text-4xl font-bold text-green-500">10M</p><p className="text-gray-500 mt-1">{t.exposure}</p></motion.div>
                            <motion.div variants={itemVariants} className="text-center"><p className="text-4xl font-bold text-green-500">300+</p><p className="text-gray-500 mt-1">{t.kols}</p></motion.div>
                            <motion.div variants={itemVariants} className="text-center"><p className="text-4xl font-bold text-green-500">80+</p><p className="text-gray-500 mt-1">{t.cases}</p></motion.div>
                        </motion.div>
                    </div>
                    <motion.div className="relative flex justify-center items-center h-full" variants={itemVariants}>
                        <img src="/hero-graphic.png" alt="Tree Finance 3D Graphic" className="w-full max-w-sm md:max-w-md transform transition-transform duration-500 hover:scale-105 drop-shadow-2xl" />
                    </motion.div>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const ServiceOverview = ({ t }) => (
        <AnimatedSection id="service">
            <div className="container mx-auto px-4 text-center relative z-10">
              <SectionBg />
              <div className="relative z-10">
                    <motion.h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400 mb-8 leading-tight mx-auto md:mx-0" variants={itemVariants}>{t.serviceOverview}</motion.h2>
                    <motion.div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center" variants={containerVariants}>
                        {t.services.map((service, index) => (
                            <motion.div 
                                key={index} 
                                className="service-card glass-strong relative overflow-hidden transition-transform duration-300 flex items-center justify-center"
                                variants={cardVariants}
                                onMouseMove={(e) => {
                                    const el = e.currentTarget;
                                    const rect = el.getBoundingClientRect();
                                    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 ~ 0.5
                                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                                    el.style.setProperty('--rx', `${-y * 8}deg`);
                                    el.style.setProperty('--ry', `${x * 12}deg`);
                                    el.style.setProperty('--scale', '1.03');
                                    el.style.setProperty('--ty', '-8px');
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget;
                                    el.style.setProperty('--rx', '0deg');
                                    el.style.setProperty('--ry', '0deg');
                                    el.style.setProperty('--scale', '1');
                                    el.style.setProperty('--ty', '0px');
                                }}
                                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 2px 8px 0 rgba(34,197,94,0.10)', backdropFilter: 'blur(32px) saturate(180%)', border: '1.5px solid rgba(255,255,255,0.7)' }}
                            >
                                <div className="inner-bg absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(circle at top left, rgba(34, 197, 94, 0.25), transparent 80%)', filter: 'blur(48px)', opacity: 0.85 }}></div>
                                <div className="z-10 p-6 text-center">
                                    {/* 使用黑色文字，使服务名称更加清晰可读 */}
                                    <p className="card-title text-base md:text-sm lg:text-base font-semibold text-black drop-shadow-lg">{service}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </AnimatedSection>
);

const ResourcesSection = ({ t }) => {
    const icons = [<Briefcase size={32}/>, <Radio size={32}/>, <Users size={32}/>, <Zap size={32}/>, <MessageSquare size={32}/>];
        return (
            <AnimatedSection>
                <div className="container mx-auto px-4 relative z-10">
                  <SectionBg />
                  <div className="relative z-10">
                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8" variants={containerVariants}>
                            {t.resources.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="glass-card glass-strong p-6 rounded-2xl flex flex-col items-center text-center transition-transform duration-300"
                                    variants={cardVariants}
                                    onMouseMove={(e) => {
                                        const el = e.currentTarget;
                                        const rect = el.getBoundingClientRect();
                                        const x = (e.clientX - rect.left) / rect.width - 0.5;
                                        const y = (e.clientY - rect.top) / rect.height - 0.5;
                                        el.style.setProperty('--rx', `${-y * 6}deg`);
                                        el.style.setProperty('--ry', `${x * 10}deg`);
                                        el.style.setProperty('--scale', '1.025');
                                        el.style.setProperty('--ty', '-6px');
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget;
                                        el.style.setProperty('--rx', '0deg');
                                        el.style.setProperty('--ry', '0deg');
                                        el.style.setProperty('--scale', '1');
                                        el.style.setProperty('--ty', '0px');
                                    }}
                                    style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 2px 8px 0 rgba(34,197,94,0.10)', backdropFilter: 'blur(32px) saturate(180%)', border: '1.5px solid rgba(255,255,255,0.7)' }}
                                >
                                    <div className="text-green-600 mb-4 bg-white/70 p-4 rounded-full shadow-inner" style={{ boxShadow: '0 4px 16px 0 rgba(34,197,94,0.10)' }}>{icons[index]}</div>
                                    <h3 className="card-title text-lg font-bold text-gray-800 mb-2 drop-shadow-lg">{item.title}</h3>
                                    <p className="card-desc text-gray-600 text-sm leading-relaxed drop-shadow">{item.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>
    );
};

const DetailedServiceSection = ({ t }) => (
    <AnimatedSection>
        <div className="container mx-auto px-4 relative z-10">
            <SectionBg />
            <div className="relative z-10">
                <div className="absolute top-0 right-0 h-full w-1/3 pointer-events-none" aria-hidden="true">
                    <svg className="absolute top-0 right-0 h-full text-gray-200/50" width="350" viewBox="0 0 350 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M349.5 0V538.5C349.5 593.729 304.729 638.5 250 638.5H100C44.7715 638.5 0 683.271 0 738.5V1500" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                </div>
                {t.detailedServices.map((service, index) => (
                    <motion.div
                        key={index}
                        className="grid md:grid-cols-2 items-center gap-12 my-20 md:my-28 relative"
                        variants={itemVariants}
                    >
                        <span className="hidden md:block absolute -left-12 -top-12 text-9xl font-extrabold text-gray-200/40 select-none -z-10">
                            0{index + 1}
                        </span>
                        <div className={`flex justify-center items-center relative ${index % 2 === 1 ? 'md:order-2' : ''}`}> 
                            {/* 动态绿色光晕 */}
                            <span 
                                className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none"
                                style={{
                                    width: '80%',
                                    height: '36%',
                                    zIndex: 0,
                                    filter: 'blur(32px)',
                                    opacity: 0.7,
                                    background: 'radial-gradient(ellipse at 50% 80%, #22c55e 0%, #bbf7d0 60%, transparent 100%)',
                                    animation: `haloGlow 2.8s ease-in-out infinite alternate`,
                                    display: 'block',
                                    borderRadius: '50% 50% 80% 80%/60% 60% 100% 100%',
                                }}
                            />
                            <motion.img 
                                src={`/service-icons/icon-${index + 1}.png`}
                                alt={service.title}
                                className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-2xl relative z-10"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            {/* 动态光晕动画样式 */}
                            {index === 0 && (
                                <style>{`
                                    @keyframes haloGlow {
                                        0% { opacity: 0.7; filter: blur(32px) brightness(1.1); transform: translateX(-50%) scaleX(1) scaleY(1); }
                                        100% { opacity: 1; filter: blur(48px) brightness(1.3); transform: translateX(-50%) scaleX(1.08) scaleY(1.12); }
                                    }
                                `}</style>
                            )}
                        </div>
                        <div className={`relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                             <div className="relative">
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

const AmaSection = ({ t, language }) => {
    // 使用多语言中同步的 t.amaEvents
    const amaData = t.amaEvents;

    // 保留照片墙原有逻辑（分三组图片）
    const photosSet1 = Array.from({ length: 13 }, (_, i) => `ama-photos/ama-photos${i + 1}.jpg`);
    const photosSet2 = Array.from({ length: 13 }, (_, i) => `ama-photos/ama-photos${i + 14}.jpg`);
    const photosSet3 = Array.from({ length: 13 }, (_, i) => `ama-photos/ama-photos${i + 27}.jpg`);

    // 预加载图片函数
    const preloadImages = (imageUrls) => {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    };

    useEffect(() => {
        const allPhotos = [
            ...photosSet1,
            ...photosSet2,
            ...photosSet3,
            ...amaData.map(d => d.image)
        ];
        preloadImages(allPhotos);
    }, []);

    return (
        <AnimatedSection id="ama">
            <div className="container mx-auto px-4 space-y-20 relative">
                {/* Ama 专用底部向上渐变背景 */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '80%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to top, rgba(6, 222, 85, 0.28), rgba(16, 217, 90, 0.12) 25%, rgba(255,255,255,0) 70%)',
                    filter: 'blur(30px)'
                }} />
                <SectionBg styleOverrides={{ blob1: { opacity: 0.18, filter: 'blur(60px)' }, blob2: { opacity: 0.12, filter: 'blur(40px)' } }} />
                <motion.div className="space-y-12" variants={containerVariants}>
                    <motion.h2 className="text-4xl font-bold text-center text-gray-800" variants={itemVariants}>{t.amaTitle}</motion.h2>

                    {amaData.map((item, idx) => (
                        <motion.div key={idx} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center" variants={itemVariants}>
                            <motion.img src={item.image} alt={item.title || item.theme} className="rounded-2xl shadow-xl w-full h-auto object-cover transition-transform duration-300 hover:scale-105" whileHover={{boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"}}/>
                            <div className="space-y-3">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{item.title || item.theme}</h3>
                                <p className="flex items-center text-gray-600"><Clock size={18} className="mr-3 text-green-500"/> {item.date || item.time}</p>
                                <p className="flex items-center text-gray-600"><Globe size={16} className="mr-3 text-green-500"/> <span className="mr-2">{t.labelLanguage}</span> {item.language}</p>
                                <p className="flex items-center text-gray-600"><Users size={16} className="mr-3 text-green-500"/> <span className="mr-2">{t.labelListeningVolume}</span> {item.listeningVolume}</p>
                                <a href={item.listeningLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-green-600 hover:underline"><LinkIcon size={18} className="mr-3"/> <span className="mr-2">{t.labelListeningLink}</span> {item.listeningLink}</a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 照片墙保持不变 */}
                <div className="w-full space-y-8">
                     <motion.h2 className="text-4xl font-bold text-center text-gray-800" variants={itemVariants}>{t.amaPhotoWall}</motion.h2>
                     <div className="relative w-full overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                        {/* 第一列 - 使用第一组图片 */}
                        <div className="flex animate-scroll-normal group-hover:[animation-play-state:paused]">
                            {photosSet1.map((src, i) => <img key={`a-${i}`} src={src} alt={`AMA Photo ${i}`} className="w-64 h-40 object-cover rounded-lg shadow-md mx-4 my-4 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:z-10" loading="eager" />)}
                        </div>
                        {/* 第二列 - 使用第二组图片 */}
                        <div className="flex animate-scroll-reverse group-hover:[animation-play-state:paused]">
                             {photosSet2.map((src, i) => <img key={`b-${i}`} src={src} alt={`AMA Photo ${i}`} className="w-64 h-40 object-cover rounded-lg shadow-md mx-4 my-4 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:z-10" loading="eager" />)}
                        </div>
                        {/* 第三列 - 使用第三组图片 */}
                         <div className="flex animate-scroll-normal group-hover:[animation-play-state:paused]">
                             {photosSet3.map((src, i) => <img key={`c-${i}`} src={src} alt={`AMA Photo ${i}`} className="w-64 h-40 object-cover rounded-lg shadow-md mx-4 my-4 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:z-10" loading="eager" />)}
                        </div>
                     </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const VideoReview = ({ t }) => {
    // 视频数据
    const videos = Array.from({ length: 11 }, (_, i) => ({
        id: i + 1,
        src: `videos/V/video${i + 1}.mp4`,
        poster: `videos/P/video${i + 1}-poster.png`
    }));
    const duplicatedVideos = [...videos, ...videos];
    // 当前播放索引
    const [playingIdx, setPlayingIdx] = useState(null);
    const videoRefs = React.useRef([]);
    // 预加载封面
    useEffect(() => {
        const preloaders = videos.map(v => {
            const img = new window.Image();
            img.src = v.poster;
            return img;
        });
        return () => { preloaders.forEach(img => { img.src = ''; }); };
    }, []);
    // 自动播放
    useEffect(() => {
        if (playingIdx !== null && videoRefs.current[playingIdx]) {
            videoRefs.current[playingIdx].play();
        }
    }, [playingIdx]);
    return (
        <AnimatedSection id="event">
            <div className="container mx-auto px-4 text-center relative z-10">
                <SectionBg />
                <motion.h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400 leading-tight mx-auto md:mx-0" variants={itemVariants}>{t.videoReview}</motion.h2>
                <div className="mt-12 w-full relative group overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
                    <div className="flex animate-scroll-normal group-hover:[animation-play-state:paused]">
                        {duplicatedVideos.map((video, i) => (
                            <div
                                key={`a-${i}`}
                                className="w-80 h-48 mx-4 my-4 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer relative group"
                                onClick={() => setPlayingIdx(i)}
                            >
                                {playingIdx === i ? (
                                    <video
                                        ref={el => videoRefs.current[i] = el}
                                        src={video.src}
                                        poster={video.poster}
                                        className="w-full h-full object-cover rounded-2xl"
                                        controls
                                        autoPlay
                                        onClick={e => e.stopPropagation()}
                                        onEnded={() => setPlayingIdx(null)}
                                    />
                                ) : (
                                    <>
                                        <img
                                            src={video.poster}
                                            alt={`Video ${video.id} Thumbnail`}
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                        {/* 固定显示播放按钮 */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity pointer-events-none">
                                            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6.5 5.5v9l7-4.5-7-4.5z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};


function Footer({ t }) {
    const [showWeChat, setShowWeChat] = useState(false);
    const popRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popRef.current && !popRef.current.contains(e.target)) {
                setShowWeChat(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // small feedback could be added here (toast), but keep minimal
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    return (
        <AnimatedSection className="min-h-screen flex items-center justify-center pb-24">
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
                <SectionBg />
                <motion.h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400 leading-tight mx-auto md:mx-0" variants={itemVariants}>
                    {t.footerTitle}
                </motion.h2>
                <motion.div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4" variants={containerVariants}>
                    {/* X links: CN / EN */}
                    <motion.div className="flex items-center gap-3" variants={itemVariants}>
                        <motion.a href="https://x.com/TreefinanceCN" target="_blank" rel="noopener noreferrer" className="footer-button flex items-center gap-3" whileHover={{ scale: 1.05, y: -3 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 p-1 bg-black text-white rounded-full">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            <span className="hidden sm:inline">X CN</span>
                        </motion.a>
                        <motion.a href="https://x.com/TreefinanceMed" target="_blank" rel="noopener noreferrer" className="footer-button flex items-center gap-3" whileHover={{ scale: 1.05, y: -3 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 p-1 bg-black text-white rounded-full">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            <span className="hidden sm:inline">X EN</span>
                        </motion.a>
                    </motion.div>

                    {/* Telegram links */}
                    <motion.div className="flex items-center gap-3" variants={itemVariants}>
                        <motion.a href="https://t.me/BIGBIGNONO" target="_blank" rel="noopener noreferrer" className="footer-button flex items-center gap-3" whileHover={{ scale: 1.05, y: -3 }}>
                            <Send size={18} className="text-blue-500" />
                            <span className="hidden sm:inline">Martin</span>
                        </motion.a>
                        <motion.a href="https://t.me/Elma_R09" target="_blank" rel="noopener noreferrer" className="footer-button flex items-center gap-3" whileHover={{ scale: 1.05, y: -3 }}>
                            <Send size={18} className="text-blue-500" />
                            <span className="hidden sm:inline">Elma</span>
                        </motion.a>
                    </motion.div>

                    {/* WeChat popover */}
                    <motion.div className="relative" variants={itemVariants} ref={popRef}>
                        <button onClick={() => setShowWeChat(s => !s)} className="footer-button flex items-center gap-3" aria-expanded={showWeChat} aria-haspopup="true">
                            {/* WeChat icon (simple) */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6 text-green-600" fill="currentColor">
                                <path d="M32 6C17.664 6 6 15.82 6 28c0 4.632 2.12 8.887 5.76 12.078L10 58l18.47-8.03C30.06 51.49 31.995 52 34 52c14.336 0 26-9.82 26-22S48.336 6 34 6H32zM22 26.5c0-2.485 1.79-4.5 4-4.5s4 2.015 4 4.5S28.21 31 26 31s-4-2.515-4-4.5zM42 26.5c0-2.485 1.79-4.5 4-4.5s4 2.015 4 4.5S48.21 31 46 31s-4-2.515-4-4.5z"/>
                            </svg>
                            <span className="hidden sm:inline">WeChat</span>
                        </button>

                        {showWeChat && (
                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg p-3 text-left z-50" role="dialog" aria-label="WeChat IDs">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <div className="text-sm font-semibold">Martin</div>
                                        <div className="text-xs text-gray-600">BTC-Martin</div>
                                    </div>
                                    <div>
                                        <button onClick={() => copyToClipboard('BTC-Martin')} className="text-sm text-green-600 ml-2">Copy</button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-semibold">Elma</div>
                                        <div className="text-xs text-gray-600">Elma_101D</div>
                                    </div>
                                    <div>
                                        <button onClick={() => copyToClipboard('Elma_101D')} className="text-sm text-green-600 ml-2">Copy</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </AnimatedSection>
    );
}


// 全局静态光团背景组件（去除动画以降低渲染开销，增加数量以提升视觉层次）
const DynamicBlobsBg = ({ count = 24 }) => {
    const [blobs, setBlobs] = useState([]);
    useEffect(() => {
        // 随机生成光团参数（一次性静态生成）
        const newBlobs = Array.from({ length: count }).map(() => {
            const size = Math.round(20 + Math.random() * 360); // 20 ~ 380 px
            const left = Math.random() * 100; // 0% ~ 100%
            const top = Math.random() * 100; // 0% ~ 100%
            const palettes = [
                'radial-gradient(circle at 50% 50%, #bff3c7 18%, #22c55e 55%, transparent 100%)',
                'radial-gradient(circle at 40% 40%, #e6f9ea 12%, #86efac 48%, transparent 100%)',
                'radial-gradient(circle at 60% 60%, #dbeaa3 10%, #4ade80 45%, transparent 100%)',
                'radial-gradient(circle at 50% 50%, #dff9e8 8%, #9be15d 46%, transparent 100%)',
            ];
            const bg = palettes[Math.floor(Math.random() * palettes.length)];
            const opacity = Number((0.06 + Math.random() * 0.22).toFixed(3));
            const blur = Math.round(6 + Math.random() * Math.min(72, size * 0.2));
            return { size, left, top, bg, opacity, blur };
        });
        setBlobs(newBlobs);
    }, [count]);

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
        }}>
            {blobs.map((b, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: `${b.left}%`,
                        top: `${b.top}%`,
                        width: b.size,
                        height: b.size,
                        borderRadius: '50%',
                        background: b.bg,
                        opacity: b.opacity,
                        filter: `blur(${b.blur}px)`,
                        mixBlendMode: 'screen',
                        transform: 'translateZ(0)'
                    }}
                />
            ))}
        </div>
    );
};

function App() {
    const [language, setLanguage] = useState('cn');
    const t = translations[language];

    return (
        <div>
            <style>{`
                :root {
                        --green-50:  #f0fdf4;
                        --green-100: #dcfce7;
                        --green-200: #bbf7d0;
                        --green-300: #86efac;
                        --green-400: #4ade80;
                        --green-500: #22c55e;
                        --green-600: #16a34a;
                        --lime-200:  #e6ed93;
                        font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                }
                html, body, #root {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                }
                body {
                        background: linear-gradient(180deg, #e6f9ea 0%, #f7f7d2 100%);
                }
        .glass-card {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(20px) saturate(150%);
            -webkit-backdrop-filter: blur(20px) saturate(150%);
            border: 1px solid rgba(255, 255, 255, 0.6);
            /* interaction variables for subtle 3D tilt and lift */
            --rx: 0deg;
            --ry: 0deg;
            --scale: 1;
            --ty: 0px;
            transform: perspective(1000px) translateY(var(--ty)) rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--scale));
            transition: transform 300ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms ease;
            will-change: transform, box-shadow;
        }
        .footer-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 700;
            color: #0f172a; /* slate-900 for better contrast */
            padding: 0.6rem 1.25rem;
            border-radius: 12rem;
            background: rgba(255, 255, 255, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.22);
            backdrop-filter: blur(10px) saturate(150%);
            -webkit-backdrop-filter: blur(10px) saturate(150%);
            box-shadow: 0 6px 18px rgba(16,24,40,0.06);
            transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
        }
        .footer-button:hover {
            transform: translateY(-4px) scale(1.02);
            background: rgba(255, 255, 255, 0.26);
            box-shadow: 0 14px 30px rgba(16,24,40,0.12);
        }
                .footer-button span {
                        margin-left: 0.75rem;
                }
                @keyframes scroll-normal {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                }
                @keyframes scroll-reverse {
                        from { transform: translateX(-50%); }
                        to { transform: translateX(0); }
                }
                .animate-scroll-normal {
                        display: flex;
                        width: max-content;
                        animation: scroll-normal 60s linear infinite;
                }
                .animate-scroll-reverse {
                        display: flex;
                        width: max-content;
                        animation: scroll-reverse 60s linear infinite;
                }
        .service-card {
            position: relative;
            width: 100%;
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(20px) saturate(150%);
            -webkit-backdrop-filter: blur(20px) saturate(150%);
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 1rem;
            overflow: hidden;
            /* interaction variables for subtle 3D tilt and lift */
            --rx: 0deg;
            --ry: 0deg;
            --scale: 1;
            --ty: 0px;
            transform: perspective(1000px) translateY(var(--ty)) rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--scale));
            transition: transform 300ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms ease;
            box-shadow: 0 6px 18px rgba(16,24,40,0.06);
            will-change: transform, box-shadow;
        }
        .service-card:hover {
            --scale: 1.04;
            --ty: -10px;
            box-shadow: 0 20px 40px rgba(16,24,40,0.12);
        }
        .service-card .inner-bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: radial-gradient(circle at top left, rgba(34, 197, 94, 0.35), transparent 70%);
            opacity: 0.7;
            filter: blur(40px);
            transition: transform 0.6s ease-out, opacity 300ms ease;
            z-index: -1;
        }
        .service-card:hover .inner-bg {
            transform: scale(1.08) translateZ(0);
            opacity: 0.95;
        }

        /* Text transitions inside cards */
        .card-title {
            transition: transform 260ms cubic-bezier(.2,.9,.2,1), text-shadow 260ms ease, color 260ms ease;
            text-shadow: 0 1px 0 rgba(0,0,0,0.02);
        }
        .service-card:hover .card-title,
        .glass-card:hover .card-title {
            transform: translateY(-4px);
            text-shadow: 0 10px 30px rgba(34,197,94,0.12);
        }
        .card-desc {
            transition: transform 260ms cubic-bezier(.2,.9,.2,1), opacity 260ms ease, color 260ms ease;
        }
        .service-card:hover .card-desc,
        .glass-card:hover .card-desc {
            transform: translateY(-2px);
            opacity: 0.95;
        }
            `}</style>
            {/* 全局光团背景（静态，数量增加以增强视觉密度） */}
            <DynamicBlobsBg count={28} />
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <div className="relative z-10 font-sans">
                    <Header language={language} setLanguage={setLanguage} t={t} />
                    <main>
                        <div className="pt-20 md:pt-28">
                            <HeroSection t={t} />
                            <ServiceOverview t={t} />
                            <ResourcesSection t={t} />
                            <DetailedServiceSection t={t} />
                            <AmaSection t={t} language={language} />
                            <VideoReview t={t} />
                            <Footer t={t} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;

