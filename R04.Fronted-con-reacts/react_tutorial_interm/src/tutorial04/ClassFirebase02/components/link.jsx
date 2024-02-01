import { useEffect, useRef, useState } from "react";
import style from "./link.module.css";

export default function Link({ docId, title, url, onDelete, onUpdate }) {
  // variables
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);
  // actulizar
  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);
  // se usa cuando se modificar los inputs y actualiza
  const titleRef = useRef(null);
  const urlRef = useRef(null);
  //
  useEffect(() => {
    // se ejecuta cuando se modificar el input
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    // se ejecuta cuando se modificar el input
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);
  //
  function handlEditTitle() {
    setEditTitle(true); // cambia la interfaz
  }

  function handlEditUrl() {
    setEditUrl(true); // cambia la interfaz
  }
  //
  function handleChangeTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handlChangeUrl(e) {
    setCurrentUrl(e.target.value);
  }
  // se ejecuando cuando pierda el focus del input
  function handleBlurTitle(e) {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }
  // se ejecuando cuando pierda el focus del input
  function handleBlurUrl(e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleDelete() {
    onDelete(docId);
  }

  const inputTitle = (
    <input
      ref={titleRef}
      value={currentTitle}
      onChange={handleChangeTitle}
      onBlur={handleBlurTitle}
    />
  );
  const btnTitle = (
    <div>
      <button className={style.btnEdit} onClick={handlEditTitle}>
        <span className="material-icons"> edit </span>
      </button>
      {currentTitle}
    </div>
  );

  const inputUrl = (
    <input
      ref={urlRef}
      value={currentUrl}
      onChange={handlChangeUrl}
      onBlur={handleBlurUrl}
    />
  );
  const btnUrl = (
    <div>
      <button onClick={handlEditUrl}>
        <span className="material-icons"> edit </span>
      </button>
      {currentUrl}
    </div>
  );

  return (
    <div className={style.link} key={docId}>
      {/*  */}
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
          {editTitle ? inputTitle : btnTitle}
        </div>
      </div>
      {/*  */}
      <div className={style.linkInfo}>
        <div className={style.linkUrl}>{editUrl ? inputUrl : btnUrl}</div>
      </div>
      {/*  */}
      <div className={style.linkActions}>
        <button className={style.btnDelete} onClick={handleDelete}>
          <span className="material-icons"> delete </span>
        </button>
      </div>
      {/*  */}
    </div>
  );
}
