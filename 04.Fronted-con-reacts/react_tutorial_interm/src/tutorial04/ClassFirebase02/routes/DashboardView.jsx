import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import Link from "../components/link";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from "uuid";


import { collection, getDocs, query, where } from "firebase/firestore";
import {
  deleteLink,
  getLinks,
  insertNewLink,
  updateLink,
} from "../firebase/firebase";

import style from "./dashboardView.module.css";
import styleLinks from "../components/link.module.css";

export default function DashboardView() {
  //
  const navigate = useNavigate();
  //
  const [curentUser, setCurentUser] = useState(null);
  const [state, setState] = useState(0);
  const [title, setTittle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  //
  async function handleUserLoggedIng(user) {
    setCurentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  }
  function handleUserNoRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIng}
        onUserNotRegistered={handleUserNoRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading....
      </AuthProvider>
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    addLink();
  }

  function addLink() {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: curentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTittle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }

  function handleOnChange(e) {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTittle(value);
    }

    if (e.target.name === "url") {
      setUrl(value);
    }
  }

  async function handleDeteleLink(docId) {
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);
    setLinks([...tmp]);
  }

  async function handleUpdateLink(docId, title, url) {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.ulr = url;
    await updateLink(docId, link);
  }

  return (
    <DashboardWrapper>
      <div>
        <h1> Dashboard</h1>
        <form className={style.entryContainer} action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title"> title</label>
          <input
            className=""
            type="text"
            name="title"
            onChange={handleOnChange}
          />

          <label htmlFor="url"> URL</label>
          <input
            className="input"
            type="text"
            name="url"
            onChange={handleOnChange}
          />

          <input className="btn" type="submit" value="create new Link" />

        </form>

        <div className={styleLinks.linksContainer}>
          {links.map((link) => {
            return (
              <Link
                key={link.docId}
                docId={link.docId}
                url={link.url}
                title={link.title}
                onDelete={handleDeteleLink}
                onUpdate={handleUpdateLink}
              />
            );
          })}
        </div>
      </div>
    </DashboardWrapper>
  );
}
