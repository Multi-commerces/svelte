<script>
  import { Router, Link, Route } from "svelte-routing";
  import Contact from "./routes/contact/+page.svelte";
  import Blog from "./routes/blog/+page.svelte";
  import Fake from "./routes/fake/+page.svelte";
  import Products from "./routes/products/+page.svelte";
  import Categories from "./routes/categories/+page.categories.svelte";
  import Category from "./routes/categories/+page.form.svelte";
  import Product from "./routes/products/+page.product.svelte";

  import ConfigImage from "./routes/utilitaires/+page.images.svelte";
  import Localisation from "./routes/utilitaires/+page.localisation.svelte";
  
  import CV2 from "./routes/cv/+page2.svelte";
  import "@nordhealth/components";

  export let url = "";
</script>

<Router {url}>
  <nord-layout class="n-reset">
    <nord-navigation slot="nav">
      <nord-button slot="header" expand variant="switch">
        <nord-avatar slot="start" variant="square">J.I</nord-avatar>
        Julien ILARI
      </nord-button>
      <nord-nav-group heading="Menu Principal" style="max-inline-size: 220px">
        
      
        <nord-nav-item icon="navigation-dashboard">
          Mon espace perso.
          <nord-nav-group slot="subnav">
            <Link to="cv"><nord-nav-item>Mon CV</nord-nav-item></Link>
            <Link to="blog"><nord-nav-item>Blog</nord-nav-item></Link>
          </nord-nav-group>
        </nord-nav-item>
       
        <nord-nav-item icon="generic-database">
          Catalogue
          <nord-nav-group slot="subnav">
            <Link to="products"><nord-nav-item>Produits</nord-nav-item></Link>
            <Link to="categories"><nord-nav-item>Categories</nord-nav-item></Link>
          </nord-nav-group>
        </nord-nav-item>

        <nord-nav-item icon="generic-database">
          Configuration
          <nord-nav-group slot="subnav">
            <Link to="configimages"><nord-nav-item>Images</nord-nav-item></Link>
            <Link to="localisation"><nord-nav-item>Localisation</nord-nav-item></Link>
          </nord-nav-group>
        </nord-nav-item>
      

        <Link to="contact"><nord-nav-item icon="generic-telephone">Contact</nord-nav-item></Link>

        
        <Link to="fake"><nord-nav-item icon="generic-arachnida">Fake</nord-nav-item></Link>
      </nord-nav-group>
    </nord-navigation>

    <nord-header slot="header">
      <h1 class="n-typescale-l">Dashboard</h1>
    </nord-header>

    <nord-stack gap="1" id="printable-main">
      <Route path="blog" component={Blog} />
      <Route path="contact" component={Contact} />
      <Route path="fake" component={Fake} />
      <Route path="products" component={Products} />
      <Route path="categories" component={Categories} />
      <Route path="category" component={Category} />
      <Route path="cv" component={CV2} />
      <Route path="product" component={Product} />
      <Route path="configimages" component={ConfigImage} />
      <Route path="localisation" component={Localisation} />
    </nord-stack>
  </nord-layout>
  <nord-command-menu />
</Router>

<style>
  /* Import dark high contrast theme */
  @import "@nordhealth/css/lib/nord.min.css";
  /* @import "@nordhealth/themes/lib/nord-dark.css"; */
</style>
