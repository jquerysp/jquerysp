$.extend( $.expr[":"], {
 containsExact: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   return function(elem) {
    return $.trim(elem.innerHTML.toLowerCase()) === text.toLowerCase();
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   return $.trim(elem.innerHTML.toLowerCase()) === match[3].toLowerCase();
  },

 containsExactCase: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   return function(elem) {
    return $.trim(elem.innerHTML) === text;
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   return $.trim(elem.innerHTML) === match[3];
  },

 containsRegex: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   var reg = /^\/((?:\\\/|[^\/]) )\/([mig]{0,3})$/.exec(text);
   return function(elem) {
    return RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML));
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   var reg = /^\/((?:\\\/|[^\/]) )\/([mig]{0,3})$/.exec(match[3]);
   return RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML));
  }

});

$(document).ready(function(){

var thisUserAccount = $().SPServices.SPGetCurrentUser({
	fieldNames: ["Name", "Title"],
	debug: false
});

//alert(thisUserAccount.Title);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = dd+'/'+mm+'/'+yyyy;
//alert(today);

$("input[title$='Vehicle Caused?']").change(function(){
    $("nobr:contains('Type of Vehicle')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[title$='Vehicle Caused?']").is(':checked')){
	$("select[title$='Type of Vehicle']").val("");
    }
});
$("input[title$='Off Site']").change(function(){
        //$("nobr:containsExactCase('Site')").parent('h3').parent('td').parent('tr').toggle();
		//$("nobr:containsExactCase('Area')").parent('h3').parent('td').parent('tr').toggle();
		//$("nobr:containsExactCase('Sub-area')").parent('h3').parent('td').parent('tr').toggle();
		//$("nobr:containsExactCase('Location')").parent('h3').parent('td').parent('tr').toggle();
	if ($("input[title$='Off Site']").is(':checked')){
		var siteselect = $("select[title$='Site']");
      alert(siteselect);
		siteselect[0].selectedIndex = 0;
		siteselect.selectmenu("refresh");
		
		//$("select[title$='Site']").selectedIndex=0;
		//$("select[title$='Area']").val("0");
		//$("select[title$='Sub-area']").val("0");
	} else {
		$("input[title$='Location']").val("");
    }
});

$("input[title$='Any person involved?']").click(function(){
$("nobr:contains('Full Name')").parent('h3').parent('td').parent('tr').toggle();
$("nobr:contains('Phone Number')").parent('h3').parent('td').parent('tr').toggle();
$("nobr:contains('Job Title')").parent('h3').parent('td').parent('tr').toggle();
$("nobr:contains('Immediate Manager')").parent('h3').parent('td').parent('tr').toggle();
$("nobr:contains('Shift Name')").parent('h3').parent('td').parent('tr').toggle();
$("nobr:contains('Nominate an Investigator')").parent('h3').parent('td').parent('tr').toggle();
$("nobr:contains('Employment Type')").parent('h3').parent('td').parent('tr').toggle();
});

$("select[title$='Type of First Aid']").change(function(){
    if ($("select[title$='Type of First Aid']").val()=="No FA provided") {
        $("nobr:contains('First Aid Treatment')").parent('h3').parent('td').parent('tr').hide();
	 $("textarea[title$='First Aid Treatment']").val("");
    } else {
        $("nobr:contains('First Aid Treatment')").parent('h3').parent('td').parent('tr').show();
    }
});



  $().SPServices.SPCascadeDropdowns({
    relationshipList: "sa_area",
    relationshipListParentColumn: "site",
    relationshipListChildColumn: "Title",
	parentColumn: "Site",
    childColumn: "Area"
  });
  $().SPServices.SPCascadeDropdowns({
    relationshipList: "sa_subarea",
    relationshipListParentColumn: "area",
    relationshipListChildColumn: "Title",
    relationshipListSortColumn: "ID",
    parentColumn: "Area",
    childColumn: "Sub-area"
  });

  $().SPServices.SPCascadeDropdowns({
    relationshipList: "ir_idc",
    relationshipListParentColumn: "TOE",
    relationshipListChildColumn: "Title",
	parentColumn: "Type of Event",
    childColumn: "Direct Causes"
  });
  $().SPServices.SPCascadeDropdowns({
    relationshipList: "ir_brc",
    relationshipListParentColumn: "IDC",
    relationshipListChildColumn: "Title",
    relationshipListSortColumn: "ID",
    parentColumn: "Direct Causes",
    childColumn: "Root Causes"
  });

  $().SPServices.SPCascadeDropdowns({
    relationshipList: "ir_rcd",
    relationshipListParentColumn: "BRC",
    relationshipListChildColumn: "Title",
    relationshipListSortColumn: "ID",
    parentColumn: "Root Causes",
    childColumn: "Detailed Root Causes"
  });

//$().SPServices.SPArrangeChoices({
//	columnName: "Type of First Aid",
//	perRow: 3
//});

$("input[title$='Incident Title']").qtip({ 
    content: {
      text: 'Please enter a short description of this incident. Please do NOT mention any names. Eg: Worker slipped in the kitchen.',
        title: 'Compulsory'
    }
});
$("input[title$='Off Site']").qtip({ 
    content: {
      text: 'Tick the checkbox if the incident did not happen at one of the sites listed in the Site field below. Eg: tick the checkbox if the incident happened on the road.'
    }
});
$("input[title$='Any person involved?']").qtip({ 
    content: {
        text: 'Anyone involved?',
        title: 'Person involved'
    }
});

$("input[title$='Vehicle Caused?']").qtip({ 
    content: {
        text: 'Tick the checkbox if this incident was caused by a motor vehicle.'
    }
});

$("nobr:contains('Full Name')").parent('h3').parent('td').parent('tr').qtip({ 
    content: {
        text: 'This is full name.',
        title: 'Full Name'
    }
});

$("input[title$='Investigation Completed']").change(function(){
if ($("input[title$='Investigation Completed']").is(':checked')){
//        $("nobr:contains('Investigation Completed By')").parent('h3').parent('td').parent('tr').show();
//        $("nobr:contains('Investigation Completed Date')").parent('h3').parent('td').parent('tr').show();
        $("input[title$='Investigation Completed By']").val(thisUserAccount.Title);
        $("input[title$='Investigation Completed Date']").val(today);
//        $("nobr:contains('Investigation Completed By')").parent('h3').parent('td').parent('tr').hide();
//        $("nobr:contains('Investigation Completed Date')").parent('h3').parent('td').parent('tr').hide();
    } else {
//        $("nobr:contains('Investigation Completed By')").parent('h3').parent('td').parent('tr').show();
//        $("nobr:contains('Investigation Completed Date')").parent('h3').parent('td').parent('tr').show();
        $("input[title$='Investigation Completed By']").val("");
        $("input[title$='Investigation Completed Date']").val("");
//        $("nobr:contains('Investigation Completed By')").parent('h3').parent('td').parent('tr').hide();
//        $("nobr:contains('Investigation Completed Date')").parent('h3').parent('td').parent('tr').hide();
    }

});






});
