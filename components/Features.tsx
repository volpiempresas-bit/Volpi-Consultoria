import React from 'react';
import { ShieldCheck, TrendingUp, Users, Wallet } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Wallet className="text-gold-600" size={32} />,
      title: "Planejamento Financeiro",
      description: "Fuja dos juros bancários. O consórcio é a ferramenta ideal para quem sabe planejar e valoriza o próprio dinheiro."
    },
    {
      icon: <ShieldCheck className="text-gold-600" size={32} />,
      title: "Segurança Garantida",
      description: "Trabalhamos apenas com administradoras fiscalizadas pelo Banco Central, garantindo a entrega do seu bem."
    },
    {
      icon: <TrendingUp className="text-gold-600" size={32} />,
      title: "Poder de Compra",
      description: "Com a carta de crédito em mãos, você tem poder de pagamento à vista, permitindo excelentes negociações."
    },
    {
      icon: <Users className="text-gold-600" size={32} />,
      title: "Consultoria Dedicada",
      description: "Acompanhamento do início ao fim. Da escolha do plano ideal até a contemplação e utilização do crédito."
    }
  ];

  return (
    <section id="diferenciais" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-graphite-900 mb-4">Por que escolher a Volpi?</h2>
          <div className="w-20 h-1 bg-gold-400 mx-auto mb-6"></div>
          <p className="text-slate-600">
            Não vendemos apenas cotas. Entregamos estratégia para alavancagem patrimonial e realização de sonhos com segurança.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 bg-slate-50 hover:bg-white border border-slate-100 hover:border-gold-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 group"
            >
              <div className="mb-6 p-4 bg-white inline-block shadow-sm group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};