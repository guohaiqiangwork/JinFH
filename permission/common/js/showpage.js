



function showPage(img,spanID)

{

  if(spanID.style.display=="")

  {

   //�ر�

    spanID.style.display="none";

    img.src="/reins/images/butCollapse.gif";

  }

  else

  {

   //չ��

    spanID.style.display="";

    img.src="/reins/images/butExpand.gif";

  }

}



