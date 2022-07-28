import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponents';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import About from './AboutComponent';
import { Switch, Redirect, withRouter} from  'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, postComment, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}




const mapDispatchToProps = dispatch => ({
  
  
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: () => { dispatch(actions('feedback'))},
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    )
});

class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
          dishes: DISHES,
          selectedDish: null,
          comments: COMMENTS,
          promotions: PROMOTIONS,
          leaders: LEADERS
      };
    }
    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeadears();
    
    
    }

    
     
  
    render() {
      
      
      const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                postComment={this.props.postComment}
                postFeedback={this.props.postFeedback}
                leaderLoading={this.props.leaders.isLoading}
            />
        );
      }
      
      
      const Contact =()=>{
        return(
          <Contact  
          resetFeedbackForm={this.props.resetFeedbackForm}
          postFeedback={this.props.postFeedback}/>
        );
      }

      const About =()=>{
        return(
          <About leaders={this.state.leaders}/>
        );
      }

      const DishWithId = ({match}) => {
        return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
              comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              postComment={this.props.postComment}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              commentsErrMess={this.props.comments.errMess} 
             />
              
            
        );
      };
      
      
      return (
        <div>
         
         <Header />
        
         <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}  />} />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        
        <Footer />

          <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        </div>
      );
    }
  }


  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));