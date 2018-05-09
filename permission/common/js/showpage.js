



function showPage(img,spanID)

{

  if(spanID.style.display=="")

  {

   //¹Ø±Õ

    spanID.style.display="none";

    img.src="/reins/images/butCollapse.gif";

  }

  else

  {

   //Õ¹¿ª

    spanID.style.display="";

    img.src="/reins/images/butExpand.gif";

  }

}



