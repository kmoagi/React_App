import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, ModalBody, ModalHeader, Row, Col, CardBody, CardText, CardTitle } from 'reactstrap';
import { Control, LocalForm, Errors, Modal } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';




const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);




class CommentForm extends Component {
    constructor(props) {
        super(props);
  
      this.toggleNav = this.toggleNav.bind(this);
      this.state = {
        isModalOpen: false
      };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }


 


toggleModal(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }


handleSubmit(values) {
    this.toggleModal();// event.preventDefault();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

}

render(){

    return(

        <div className="Container">
         <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}></Modal>
         <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>

        <LocalForm>
<Modal>
    <div className="Modal">
 
  
                      <Row className="form-group">
                      <Label htmlFor="rating" md={12}>Rating</Label>

                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".rating" id="rating" name="rating"  className="form-control" md={12}>
                                      
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    
                                    </Control.select>
                                </Col>
                            </Row>
                      
                      
                      
                       <Row className="form-group">
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                
                                
                                <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                
                                
                                </Col>
                            </Row>
         
         
         
         
          <Row className="form-group">
            <Label htmlFor="message" md={2}>Comments</Label>
                 <Col md={10}>
                    <Control.textarea model=".message" id="message" name="message" rows="12" className="form-control" />
                 </Col>
                </Row>


                <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>

           </div>
           </Modal>
         </LocalForm>
        </ModalBody>
        
        </div> 
    );
    }
}





function RenderComments({comments, postComment, dishId}){

if (comments != null)
return (
    <div>
        <h4>Comments</h4>
        <ul class="list-unstyled">
                     <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
        </ul>
     
     
     <CommentForm dishId={dishId} postComment={postComment} />
    </div>
);

else
return (
    <div>
        <CommentForm/>
    </div>
);


}   



function RenderDish({dish}) {
  return (
      <div className="row">
          <div className="col-12 col-md-5 m-1">
           {this.renderCard(dish)}
          
          
           <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
          
          
          
          </div>
          <div className="col-12 col-md-5 m-1">
              {this.renderComments(dish)}
          </div>
      </div>
  );
}



const  DishDetail = (props) => {
  
   
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
    
  

  
    if (this.props.dish != null)
      return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments} 
            postComment={props.postComment}
            dishId={props.dish.id}/>
        </div>
        </div>
);
  else
      return (
          <div></div>
      );
}
                                                    


export default Dishdetail;