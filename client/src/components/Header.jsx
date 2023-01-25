import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { postTracing, deleteTracing } from "../../redux/slices/tracingSlice";
import { AiOutlineHome, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { logout, getUserByName } from "../../redux/slices/userSlice";
import { useRouter } from "next/router";

export const Header = ({ logged, userName }) => {
  const router = useRouter();

  const { userSearch } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const [searchUser, setSearchUser] = useState("");

  const handleChange = (value) => {
    value = value.trim();
    setSearchUser(value);
    if (searchUser.length > 0) {
      dispatch(getUserByName(searchUser, logged));
    }
  };

  const handleClickFollow = (following) => {
    postTracing(following, logged);
    setSearchUser("");
  };

  const handleClickUnfollow = (following) => {
    deleteTracing(following, logged);
    setSearchUser("");
  };

  const handleClickMyAccount = () => {
    router.push("/my-account");
  };

  return (
    <div id="header">
      <Navbar bg="light" expand="lg" className="nav">
        <Container fluid className="container">
          <Link href="/welcome" className="header-title">
            Instact
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" className="toogle" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" className="header-item">
                <AiOutlineHome /> <span>Home</span>
              </Link>
              <Link href="/new-post" className="header-item">
                <BiMessageSquareAdd /> <span>New Post</span>
              </Link>
              <Link href="/action1" className="header-item">
                <AiOutlineHeart /> <span>Favorites</span>
              </Link>
              <NavDropdown
                title={
                  <span className="item">
                    <AiOutlineUser /> {userName}
                  </span>
                }
                id="navbarScrollingDropdown"
                className="header-item-user"
              >
                <NavDropdown.Item
                  onClick={() => handleClickMyAccount()}
                  className="dropdown-item"
                >
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => logout()}
                  className="dropdown-item"
                >
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex header-form">
              <Form.Control
                type="search"
                placeholder="Search user"
                className="me-2 header-input"
                aria-label="Search"
                value={searchUser}
                onChange={(e) => handleChange(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {userSearch && userSearch.length > 0 && searchUser.length > 0 && (
        <div className="container header-search">
          {userSearch.map((user) => {
            return (
              <ul className="list-group list" key={user._id}>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="username">
                    <span className="badge rounded-pill user-img">
                      <img
                        src={user.image || process.env.NEXT_PUBLIC_USER_IMG_URL}
                      />
                    </span>
                    {user.username}
                  </div>
                  {!user.following ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleClickFollow(user._id)}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleClickUnfollow(user._id)}
                    >
                      Unfollow
                    </button>
                  )}
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};
