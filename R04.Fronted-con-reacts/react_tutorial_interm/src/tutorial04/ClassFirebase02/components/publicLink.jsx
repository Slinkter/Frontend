import style from "./publickLink.module.css";

export default function PublickLink({ url, title }) {
  return (
    <a className={style.publicLinksContainer} href={url}>
      <div>{title}</div>
    </a>
  );
}
