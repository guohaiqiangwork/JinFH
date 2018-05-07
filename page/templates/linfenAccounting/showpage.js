



function showPage(img,spanID)

{

  if(spanID.style.display=="")

  {

   //关闭

    spanID.style.display="none";

    img.src="/reins/images/butCollapse.gif";

  }

  else

  {

   //展开

    spanID.style.display="";

    img.src="/reins/images/butExpand.gif";

  }

}



