import { Component } from "react";
import getUsers from "../api";
import Users from "../Users";
import styles from "./UserLoader.module.sass";

class UsersLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: 1,
      cards: 5,
      gender: "all",
      inc: ["name", "email", "login", "picture", "gender", "nat"],
    };
  }

  loadUsers = () => {
    const { currentPage, cards, gender, inc } = this.state;

    this.setState({ isFetching: true });
    getUsers({
      page: currentPage,
      results: cards,
      gender: gender,
      inc: inc,
    })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, cards, gender, inc } = this.state;

    if (
      currentPage !== prevState.currentPage ||
      cards !== prevState.cards ||
      gender !== prevState.gender ||
      inc !== prevState.inc
    ) {
      this.loadUsers();
    }
  }

  prevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  nextPage = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  };

  cardsHandler = (e) => {
    this.setState({ cards: e.target.value });
  };
  genderHandler = (e) => {
    this.setState({ gender: e.target.value });
  };

  handleCheckboxChange = (e) => {
    const { inc } = this.state;
    const newInc = [...inc];
    const phone = "phone";
    newInc.push(phone);
    e.target.checked
      ? this.setState({
          inc: newInc,
        })
      : this.setState({
          inc: newInc.filter((i) => i !== "phone"),
        });
  };

  render() {
    const { users, isFetching, error } = this.state;
    console.log("users", users);

    return (
      <>
        {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please waite...</div>}
        {!error && !isFetching && (
          <>
            <form className={styles.cardForm}>
              <label>
                <span>Cards count</span>
                <select
                  value={this.state.cards}
                  onChange={this.cardsHandler}
                  name="cards"
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </label>

              <label>
                <span>Gender</span>
                <select
                  value={this.state.gender}
                  onChange={this.genderHandler}
                  name="gender"
                >
                  <option value="all">all</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="phone"
                  checked={this.state.inc.includes("phone")}
                  onChange={this.handleCheckboxChange}
                />
                <span>Phone</span>
              </label>

              <button type="button" onClick={this.prevPage}>
                {"<"}
              </button>
              <button type="button" onClick={this.nextPage}>
                {">"}
              </button>
            </form>

            <ul>
              {users.map((u) => (
                <Users key={u.login.uuid} users={u} />
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

export default UsersLoader;
