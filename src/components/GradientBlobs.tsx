const GradientBlobs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30 top-[-200px] left-[-100px] bg-pastel-blue animate-float-slow" />
    <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-25 top-[40%] right-[-150px] bg-pastel-purple animate-float-slower" />
    <div className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-25 bottom-[10%] left-[10%] bg-pastel-green animate-float-slowest" />
    <div className="absolute w-[350px] h-[350px] rounded-full blur-3xl opacity-20 top-[20%] left-[50%] bg-pastel-sand animate-float-slower" />
  </div>
);

export default GradientBlobs;
