const GradientBlobs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute w-[600px] h-[600px] rounded-full top-[-10%] right-[-5%] bg-blue-accent opacity-[0.08]" style={{ filter: 'blur(160px)' }} />
    <div className="absolute w-[500px] h-[500px] rounded-full bottom-[10%] left-[-10%] bg-cyan-accent opacity-[0.08]" style={{ filter: 'blur(160px)' }} />
    <div className="absolute w-[450px] h-[450px] rounded-full top-[40%] left-[40%] bg-purple-accent opacity-[0.06]" style={{ filter: 'blur(160px)' }} />
  </div>
);

export default GradientBlobs;
