import React from 'react';
import { ShieldCheck, TrendingUp, Users, Wallet } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Wallet className="text-gold-600" size={32} strokeWidth={1.5} />,
      title: "Planejamento Financeiro",
      description: "Fuja dos juros bancários. O consórcio é a ferramenta ideal para quem sabe planejar e valoriza o próprio dinheiro."
    },
    {
      icon: <ShieldCheck className="text-gold-600" size={32} strokeWidth={1.5} />,
      title: "Segurança Garantida",
      description: "Trabalhamos apenas com administradoras fiscalizadas pelo Banco Central, garantindo a entrega do seu bem."
    },
    {
      icon: <TrendingUp className="text-gold-600" size={32} strokeWidth={1.5} />,
      title: "Poder de Compra",
      description: "Com a carta de crédito em mãos, você tem poder de pagamento à vista, permitindo excelentes negociações."
    },
    {
      icon: <Users className="text-gold-600" size={32} strokeWidth={1.5} />,
      title: "Consultoria Dedicada",
      description: "Acompanhamento do início ao fim. Da escolha do plano ideal até a contemplação e utilização do crédito."
    }
  ];

  return (
    <section id="diferenciais" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-graphite-900 mb-6">Por que escolher a Volpi?</h2>
          <div className="w-24 h-1.5 bg-gold-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Não vendemos apenas cotas. Entregamos <span className="text-graphite-900 font-bold">estratégia</span> para alavancagem patrimonial e realização de sonhos com segurança.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-2xl transition-all duration-300 hover:bg-slate-50"
            >
              <div className="mb-6 p-4 bg-slate-50 rounded-xl inline-block group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-graphite-900 mb-3 font-serif">{feature.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};