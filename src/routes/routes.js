import React from "react";
import {Switch,Route} from "react-router";
import Home from "../components/layout/home";
import DetailCategories from "../components/categories/detailCategories";
import DetailPost from "../components/posts/detailPost";
import About from "../components/layout/about";
import Mentions from "../components/layout/mentions";
import PrivateLife from "../components/layout/private";
import NotFoundPage from "../components/layout/notFound";
import {Redirect} from "react-router-dom";

const Router = () => {
        return (
            <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/categorie/:slug"} component={DetailCategories}/>
                    <Route path={"/post/:slug"} component={DetailPost}/>
                    <Route path={"/a-propos"} component={About}/>
                    <Route path={"/mentions-legales"} component={Mentions}/>
                    <Route path={"/vie-privee"} component={PrivateLife}/>
                    <Route path={"/404"} component={NotFoundPage}/>
                    <Redirect to={"/404"} from={"*"}/>
            </Switch>
        )
}
export default Router
