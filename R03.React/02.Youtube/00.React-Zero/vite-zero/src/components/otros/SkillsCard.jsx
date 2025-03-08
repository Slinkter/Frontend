import React from "react";

const SkillsCard = ({ icon, title, text }) => {
  return (
    <article>
      <span>{icon}</span>
      <h4 className="mt-6 font-bold">{title}</h4>
      <p className="mt-2 text-slate-300">{text}</p>
    </article>
  );
};

export default SkillsCard;
