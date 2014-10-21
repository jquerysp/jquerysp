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


  $().SPServices.SPCascadeDropdowns({
    relationshipList: "sa_area",
    relationshipListParentColumn: "site",
    relationshipListChildColumn: "Title",
		parentColumn: "Site",
	simpleChild: true,
    childColumn: "Area"
  });
  $().SPServices.SPCascadeDropdowns({
    relationshipList: "sa_subarea",
    relationshipListParentColumn: "area",
    relationshipListChildColumn: "Title",
    relationshipListSortColumn: "ID",
    parentColumn: "Area",
	simpleChild: true,
    childColumn: "Sub-area"
  });

  $().SPServices.SPCascadeDropdowns({
    relationshipList: "ir_idc",
    relationshipListParentColumn: "TOE",
    relationshipListChildColumn: "Title",
	parentColumn: "Type of Event",
	simpleChild: true,
    childColumn: "Direct Causes"
  });
  $().SPServices.SPCascadeDropdowns({
    relationshipList: "ir_brc",
    relationshipListParentColumn: "IDC",
    relationshipListChildColumn: "Title",
    relationshipListSortColumn: "ID",
    parentColumn: "Direct Causes",
	simpleChild: true,
    childColumn: "Root Causes"
  });

  $().SPServices.SPCascadeDropdowns({
    relationshipList: "ir_rcd",
    relationshipListParentColumn: "BRC",
    relationshipListChildColumn: "Title",
    relationshipListSortColumn: "ID",
    parentColumn: "Root Causes",
	simpleChild: true,
	childColumn: "Detailed Root Causes"
  });

$().SPServices.SPArrangeChoices({
	columnName: "Body Part - All affected",
	perRow: 3
});
  
$("input[title$='Vehicle Caused?']").change(function(){
    $("nobr:containsExactCase('Type of Vehicle')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[title$='Vehicle Caused?']").is(':checked')){
	$("select[title$='Type of Vehicle']").val("");
    }
});

$("input[title$='Property Damaged?']").change(function(){
    $("nobr:containsExactCase('Type of Damage')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[title$='Property Damaged?']").is(':checked')){
	$("select[title$='Type of Damage']").val("");
    }
});

$("input[title$='Environmental Impact?']").change(function(){
    $("nobr:containsExactCase('Type of Impact')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Environmental Impact Details')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[title$='Environmental Impact?']").is(':checked')){
		$("select[oldtitle$='Type of Impact']").val("");
		$("textarea[oldtitle$='Environmental Impact Details']").val("");
    }
});

$("input[title$='Any Witnesses']").change(function(){
    $("nobr:containsExactCase('Witness Information')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[title$='Any Witnesses']").is(':checked')){
	$("textarea[oldtitle$='Witness Information']").val("");
	}
});

$("input[title$='Off Site']").change(function(){
        $("nobr:containsExactCase('Site')").parent('h3').parent('td').parent('tr').toggle();
		$("nobr:containsExactCase('Area')").parent('h3').parent('td').parent('tr').toggle();
		$("nobr:containsExactCase('Sub-area')").parent('h3').parent('td').parent('tr').toggle();
		$("nobr:containsExactCase('Location')").parent('h3').parent('td').parent('tr').toggle();
	if ($("input[oldtitle$='Off Site']").is(':checked')){
		$("select[title$='Site']").find('option:first').attr('selected', 'selected');
		$("select[title$='Area']").val(0);
		$("select[title$='Sub-area']").val(0);
	} else {
		$("input[oldtitle$='Location']").val("");
    }
});

$("input[title$='Any Individual(s) Involved?']").change(function(){
	$("nobr:containsExactCase('Full Name')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Phone Number')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Job Title')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Shift Name')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Employment Type')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Function/Department')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Injured/Diseased')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Incident Time Period')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[oldtitle$='Any Individual(s) Involved?']").is(':checked')){
		$("input[title$='Full Name']").val("");
		$("input[title$='Job Title']").val("");
		$("select[oldtitle$='Function/Department']").val("");
		$("select[oldtitle$='Employment Type']").val("");
		$("input[oldtitle$='Phone Number']").val("");
		$("select[title$='Shift Name']").val("");
		$("select[oldtitle$='Incident Time Period']").val("");
		$("input[oldtitle$='Injured/Diseased']").removeAttr('checked');
		$("select[oldtitle$='Type of First Aid']").val("");
		$("textarea[title$='First Aid Treatment']").val("");
		$("select[title$='Body Part - Primary']").val("");
		$("select[oldtitle$='Incident Time Period']").val("");
		$("nobr:containsExactCase('Body Part - All affected')").parents("tr:first").find('input:checkbox').each(function(){
			$(this).prop('checked',false);
		});
    }
	if (!$("input[oldtitle$='Injured/Diseased']").is(':checked')){
		$("nobr:containsExactCase('Type of First Aid')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('First Aid Treatment')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('Body Part - Primary')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('Body Part - All affected')").parent('h3').parent('td').parent('tr').hide();
    }
});

$("input[title$='Injured/Diseased']").change(function(){
	$("nobr:containsExactCase('Type of First Aid')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('First Aid Treatment')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Body Part - Primary')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Body Part - All affected')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[oldtitle$='Injured/Diseased']").is(':checked')){
		$("select[oldtitle$='Type of First Aid']").val("");
		$("textarea[title$='First Aid Treatment']").val("");
		$("select[title$='Body Part - Primary']").val("");
		$("nobr:containsExactCase('Body Part - All affected')").parents("tr:first").find('input:checkbox').each(function(){
			$(this).prop('checked',false);
		});
    }
});

$("select[title$='Type of First Aid']").change(function(){
    if ($("select[oldtitle$='Type of First Aid']").val()=="No FA provided") {
        $("nobr:containsExactCase('First Aid Treatment')").parent('h3').parent('td').parent('tr').hide();
	 $("textarea[title$='First Aid Treatment']").val("");
    } else {
        $("nobr:containsExactCase('First Aid Treatment')").parent('h3').parent('td').parent('tr').show();
    }
});

$("input[title$='Declaration']").change(function(){
if ($("input[oldtitle$='Declaration']").is(':checked')){
        $("input[title$='Reporter']").val(thisUserAccount.Title);
   }
});

























$("input[title$='Investigation Completed']").change(function(){
if ($("input[title$='Investigation Completed']").is(':checked')){
        $("input[title$='Investigation Completed By']").val(thisUserAccount.Title);
        $("input[title$='Investigation Completed Date']").val(today);
    } else {
        $("input[title$='Investigation Completed By']").val("");
        $("input[title$='Investigation Completed Date']").val("");
    }

});




///////////////////////////////////
//////////TOOLTIPS START///////////
///////////////////////////////////

$("input[title$='Incident Title']").qtip({ 
    content: {
      text: 'Please enter a short description of this incident. Please do NOT mention any names. Eg: Worker slipped in the kitchen.'
    }
});
$("input[title$='Off Site']").qtip({ 
    content: {
      text: 'Tick the checkbox if the incident did not happen at one of the sites listed in the Site field below. Eg: tick the checkbox if the incident happened on the road.'
    }
});

$("textarea[title$='Description of Incident']").qtip({ 
    content: {
      text: 'Please DO Not mention any personal health information. Clearly describe what happened. Give as much information as you can.',
      title: 'General Guidelines'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("input[title$='Location']").qtip({ 
    content: {
      text: 'Please enter the location where the incident occurred.'
    }
});

$("input[title$='Any Individual(s) Involved?']").qtip({ 
    content: {
        text: 'Please tick the checkbox if someone is involved. When more than one person is involved, only identify the primary one.'
    }
});

$("select[title$='Function/Department']").qtip({ 
    content: {
        text: 'Select an option to indicate the function/department. Eg.: For workers in the factories, Sourcing Unit should be selected. Note: General Management is only for the CEO and associated roles that are not under any specific function or department.'
    }
});

$("select[title$='Employment Type']").qtip({ 
    content: {
        text: 'Select an option to indicate the Employment Type. Select Contractor - Labour if the person is from a labour hiring agent such as Randstad. They are normally directly supervised by Unilever. Select Contractor - Trade if the person is from a contractor such as Electricians and Plumbers. They normally are not directly supervised by Unilever.'
    }
});

$("input[title$='Phone Number']").qtip({ 
    content: {
        text: 'Please enter a landline or mobile phone number.',
      title: 'Optional Field'
    }
});

$("nobr:contains('Immediate Manager or Investigator')").parent('h3').parent('td').parent('tr').qtip({ 
    content: {
        text: 'Please enter the name of the Immediate Manager if there is someone involved. For those incidents with on one involved, please nominate the most appropriate investigator here. The investigator should be the person responsible for the area and normally should not be the WHS Coordinators. If you are not sure who you should nominate as the investigator, enter the name of your WHS Coordinator.'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("input[title$='Injured/Diseased']").qtip({ 
    content: {
        text: 'Tick the checkbox only when the person is injured or diseased.'
    }
});

$("select[title$='Type of First Aid']").qtip({ 
    content: {
      text: 'Please select the propery type of first aid provided. Examples for Preventative First Aid: Heat or ice pack was provided to prevent injury, rinse eyes after contact with chemical before any injury. An example for Applied First Aid: Applying a band-aid to a finger cut.',
      title: 'General Guidelines'
    }
});

$("nobr:contains('Body Part - Primary')").parent('h3').parent('td').parent('tr').qtip({ 
    content: {
        text: 'Please select from the list to identify the part of the body affected by the most serious injury or disease. You may choose ONLY ONE option from the list.'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("nobr:contains('Body Part - All affected')").parent('h3').parent('td').parent('tr').qtip({ 
    content: {
        text: 'Please select from the list to identify all body parts affected by the injury or disease. You may choose MORE THAN ONE option from the list.'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("input[title$='Vehicle Caused?']").qtip({ 
    content: {
        text: 'Tick the checkbox if this incident was caused by a motor vehicle.'
    }
});

$("input[title$='Property Damaged?']").qtip({ 
    content: {
        text: 'Tick the checkbox if this incident caused any property damage such as buildings, plants, vehicles, etc.'
    }
});

$("input[title$='Environmental Impact?']").qtip({ 
    content: {
        text: '- an unauthorised release of chemicals to the air from a factory stack.<br>- a milk tanker rollover into a creek.<br>- a sewerage system overflow.<br>- a factory fire.<br>- illegal dumping of waste',
      title: 'Examples'
    }
});

$("textarea[title$='Environmental Impact Details']").qtip({ 
    content: {
      text: 'Please provide specifics of the incident. Examples:<br>- 10,000 litres of Sodium Hydroxide into storm water drain and subsequently into storm water containment ponds.<br>- Large dust cloud of soda ash covering bulk solids inloading area.',
      title: 'General Guidelines'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("input[title$='Any Witnesses']").qtip({ 
    content: {
        text: 'Tick the checkbox if there is any witnesses.'
    }
});

$("textarea[title$='Witness Information']").qtip({ 
    content: {
      text: 'Please provide information such as Name, Phone Number or Email.'
    }
});

$("input[title$='Not Work Related']").qtip({ 
    content: {
        text: 'Tick the checkbox if this incident is not work related. Eg: injury occurred during weekend while lifting heavy boxes at home.'
    }
});

$("input[title$='Declaration']").qtip({ 
    content: {
        text: 'Tick the checkbox when you fill out all the necessary fields above. After ticking off, you can submit this incident report by clicking the save botton at the top left or the bottom right hand side of the page.'
    }
});

$("select[title$='Incident Time Period']").qtip({ 
    content: {
        text: 'Select an option to indicate the relationship between the work hours and the incident time. If the person is a field worker then driving between sites are included in working hours.'
    }
});



$("textarea[title$='Remedial Action Taken']").qtip({ 
    content: {
      text: 'Please describe what immediately remedial action was taken after the incident.'
    }
});

$("select[title$='Nature of Injury/Disease']").qtip({ 
    content: {
        text: 'Select an option to indicate the nature of Injury/Disease. 1.XX are for Injuries and 2.XX are for Diseases.'
    }
});

$("select[title$='Primary Agency']").qtip({ 
    content: {
        text: 'Select an option to indicate the primary agency of the injury/disease.'
    }
});

$("input[title$='Notifiable to Authorities?']").qtip({ 
    content: {
        text: 'Tick the checkbox if this incident needs to be reported to the Authority such as NSW WorkCover or Vic WorkCover.'
    }
});

$("textarea[title$='Authority Notification Details']").qtip({ 
    content: {
      text: 'Please provide information such as who notified authority, which authority and what time the authority was notified.'
    }
});


$("textarea[title$='EPA Notification Details']").qtip({ 
    content: {
      text: 'Please provide information such as who notified EPA, which EPA and what time EPA was notified.'
    }
});

$("select[title$='Type of Event']").qtip({ 
    content: {
        text: 'Select an option to indicate the type of this incident. Please note that if the incident was a near miss, please select an option to indicate the MOST LIKELY type if injury/disease/property damage/environmental impact were involved.'
    }
});

$("textarea[title$='Why-Cause 1']").qtip({ 
    content: {
      text: 'Please ask and answer a serial of relevant questions to drill down and find the root cause of the incident. Eg: Question: Why did Event A happen? Answer: Because of Event B. Question: Why did Event B happen? Answer: Because of Event C. Question: Why did Event C happen? Answer: Because of Event D...',
      title: 'General Guidelines'
	  }
});

$("textarea[title$='Corrective Action']").qtip({ 
    content: {
      text: 'Please initiate the Corrective Action so that similar incidents can be prevented in the future. Please clearly specify what need to be done.',
      title: 'Manager / Investigator to complete'
    }
});

$("textarea[title$='CA Completed - Comments']").qtip({ 
    content: {
      text: 'Please clearly specify what has been done to complete the corrective action.',
      title: 'Responsible to complete'
    }
});

$("textarea[title$='CA Close Out Comments']").qtip({ 
    content: {
      text: 'Please comment on the closure of this corrective action.',
      title: 'Optional - Manager / Investigator to complete'
    }
});

$("textarea[title$='Short Description of Incident']").qtip({ 
    content: {
      text: 'Please provide a short description of this incident. This will go into the monthly report.'
    }
});

$("textarea[title$='Why not a Recordable']").qtip({ 
    content: {
      text: 'Please provide reasons why this incident is a workers comp case but not a recordable. This will go into the monthly board report.'
    }
});

$("textarea[title$='Comments']").qtip({ 
    content: {
      text: 'General comments on this incident.',
      title: 'Optional'
    }
});















});
