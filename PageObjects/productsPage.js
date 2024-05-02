class ProductsPage{

    constructor(page){
        this.page = page;
        this.products = this.page.locator(".card-body");
        this.allProducts = this.page.locator(".card-body b");
        this.clickAddToCart = this.page.locator("[routerlink*=cart]");
    }

    async selectProduct(productName){
        const titles = await this.allProducts.allTextContents();
        console.log(titles);
        // Zara Coat 3
        const countAmount = await this.products.count();
    
        for(let i = 0; i < countAmount; i++)
        {
            // in this if, we are selecting only the text of the product to compare with the wanted one.
            if (await this.products.nth(i).locator("b").textContent() === productName)
            {
                // add to cart
                await this.products.nth(i).locator("text =  Add To Cart").click();
                break;
                
            }  
        }
        await this.clickAddToCart.click();
    }


}
module.exports = {ProductsPage}