import { Component } from "react";
import getUsers from "../api";
import Users from "../Users";

class UsersLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: 1,
      cards: 5,
    };
  }

  loadUsers = () => {
    const { currentPage, cards } = this.state;

    this.setState({ isFetching: true });
    getUsers({ page: currentPage, results: cards })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, cards } = this.state;

    if (currentPage !== prevState.currentPage) {
      this.loadUsers();
    }

    if (cards !== prevState.cards) {
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

  render() {
    const { users, isFetching, error } = this.state;

    return (
      <>
        {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please waite...</div>}
        {!error && !isFetching && (
          <>
            <form>
              <label>
                <span>Cards count</span>
                <select
                  value={this.state.cards}
                  onChange={this.cardsHandler}
                  name="pages"
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </label>
            </form>

            <button onClick={this.prevPage}>{"<"}</button>
            <button onClick={this.nextPage}>{">"}</button>
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
