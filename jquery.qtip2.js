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
		$("input[oldtitle$='Production Related?']").removeAttr('checked');
		$("nobr:containsExactCase('Production Related?')").parent('h3').parent('td').parent('tr').hide();
		$("textarea[oldtitle$='5W1H - the What']").val("");
		$("textarea[oldtitle$='5W1H - the When']").val("");
		$("textarea[oldtitle$='5W1H - the Where']").val("");
		$("textarea[oldtitle$='5W1H - the Who']").val("");
		$("textarea[oldtitle$='5W1H - the Which']").val("");
		$("textarea[oldtitle$='5W1H - the How']").val("");
		$("nobr:containsExactCase('5W1H - the What')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('5W1H - the When')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('5W1H - the Where')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('5W1H - the Who')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('5W1H - the Which')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('5W1H - the How')").parent('h3').parent('td').parent('tr').hide();
	} else {
		$("input[oldtitle$='Location']").val("");
    }
});

$("select[title$='Site']").change(function(){
    if ($("select[title$='Site']").val()=="Minto" || $("select[title$='Site']").val()=="North Rocks" || $("select[title$='Site']").val()=="Petone" || $("select[title$='Site']").val()=="Tatura") {
        $("nobr:containsExactCase('Production Related?')").parent('h3').parent('td').parent('tr').show();
    } else {
		$("input[oldtitle$='Production Related?']").removeAttr('checked');
        $("nobr:containsExactCase('Production Related?')").parent('h3').parent('td').parent('tr').hide();
    }
});

$("input[title$='Production Related?']").change(function(){
	$("nobr:containsExactCase('5W1H - the What')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('5W1H - the When')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('5W1H - the Where')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('5W1H - the Who')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('5W1H - the Which')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('5W1H - the How')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[oldtitle$='Production Related?']").is(':checked')){
		$("textarea[oldtitle$='5W1H - the What']").val("");
		$("textarea[oldtitle$='5W1H - the When']").val("");
		$("textarea[oldtitle$='5W1H - the Where']").val("");
		$("textarea[oldtitle$='5W1H - the Who']").val("");
		$("textarea[oldtitle$='5W1H - the Which']").val("");
		$("textarea[oldtitle$='5W1H - the How']").val("");
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
		$("select[oldtitle$='Function/Department']").val("");
		$("select[oldtitle$='Employment Type']").val("");
		$("input[oldtitle$='Phone Number']").val("");
		$("select[title$='Shift Name']").val("");
		$("select[oldtitle$='Incident Time Period']").val("");
		$("input[oldtitle$='Injured/Diseased']").removeAttr('checked');
		$("select[oldtitle$='Type of First Aid']").val("");
		$("textarea[title$='First Aid Treatment']").val("");
		$("select[title$='Body Part - Primary']").val("");
		$("select[oldtitle$='Incident Time Period']").val("");
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
	$("nobr:containsExactCase('First Aid Treatment')").parent('h3').parent('td').parent('tr').hide();
	$("nobr:containsExactCase('Body Part - Primary')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Body Part - All affected')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[oldtitle$='Injured/Diseased']").is(':checked')){
		$("select[oldtitle$='Type of First Aid']").val("");
		$("textarea[title$='First Aid Treatment']").val("");
		$("select[title$='Body Part - Primary']").val("");
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

$("input[title$='Vehicle Caused?']").change(function(){
    $("nobr:containsExactCase('Type of Vehicle')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[title$='Vehicle Caused?']").is(':checked')){
	$("select[title$='Type of Vehicle']").val("");
    }
});

$("input[title$='Property Damaged?']").change(function(){
    $("nobr:containsExactCase('Type of Damage')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Property Damaged Details')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[title$='Property Damaged?']").is(':checked')){
		$("select[title$='Type of Damage']").val("");
		$("textarea[oldtitle$='Property Damaged Details']").val("");
    }
});

$("input[title$='Environmental Impact?']").change(function(){
    $("nobr:containsExactCase('Type of Impact')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Environmental Impact Details')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[title$='Environmental Impact?']").is(':checked')){
		$("select[title$='Type of Impact']").val("");
		$("textarea[oldtitle$='Environmental Impact Details']").val("");
    }
});

$("input[title$='Declaration']").change(function(){
if ($("input[oldtitle$='Declaration']").is(':checked')){
        $("input[title$='Reporter']").val(thisUserAccount.Title);
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

$("input[title$='Location']").qtip({ 
    content: {
      text: 'Please enter the location where the incident occurred.'
    }
});

$("textarea[title$='Description of Incident']").qtip({ 
    content: {
      text: 'Please do NOT mention any personal health information. Clearly describe what happened. Give as much information as you can.',
      title: 'General Guidelines'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("input[title$='Production Related?']").qtip({ 
    content: {
      text: 'Please tick the checkbox if the incident is production related. Eg.: a machine, a product or a production process was involved.'
    }
});

$("textarea[title$='5W1H - the What']").qtip({ 
    content: {
      text: 'Any variation due to production materials? Any materials differences? Differences among lots? Any variation due to different part dimensions, shapes? Eg.: <br>Material, Product Number, Lot Number, Component Name',
      title: 'What thing or product did you see the problem on?'
    },
});

$("textarea[title$='5W1H - the When']").qtip({ 
    content: {
      text: 'Any variation related to time or period? Does the problem occur at the start of work? in the middle? During which operations is the problem apt to occur? Is the problem likely to occur after set-up changes? Eg.: <br>Start/End Date, Shift, Time, Event (Is this problem happening on one, two or all shifts? After Start Up? Changeover? Etc.)',
      title: 'When did the problem occur?'
    },
});

$("textarea[title$='5W1H - the Where']").qtip({ 
    content: {
      text: 'Any variation due to equipment, fixtures, components? In what process / what machine elements does the problem occur? Any differences among different equipment, machine types? Any variation associated with different figs, fixtures? Eg.: <br>Line# / Equipment / Component, Location, Process.',
      title: 'Where did you see the problem? Where on the work or material did you see the problem?'
    },
});

$("textarea[title$='5W1H - the Who']").qtip({ 
    content: {
      text: 'Any variation among people involved in the operation? Any morning/day/night shift difference? Any differences among new operators, floaters, temporary staff? Eg.: <br>If the problem occurs for only certain skills levels, i.e. mechanics, operators, temps, shifts and/or experience levels, it is skill dependent. Skill independent - it could happen to anyone.',
      title: 'Is the problem related to skill? Skill dependent or independent'
    },
});

$("textarea[title$='5W1H - the Which']").qtip({ 
    content: {
      text: 'Are there any characteristic trends over time? Does it appear at regular or irregular intervals? Do problems increase or decrease? Any changes before or after? Eg.:<br>Random: Can happen anytime. <br>Periodic: the problem occurrence is predictable such as after start-ups, changeovers, only when it is 100 deg., etc.<br>Continuous: The problem occurs uninterrupted in time or sequence.',
      title: 'Which trend / pattern did you see the problem have? Is the trend random or is there a pattern?'
    },
});

$("textarea[title$='5W1H - the How']").qtip({ 
    content: {
      text: 'Any variation in circumstances of occurrence?State as exactly as you can the difference from ideal. <br>Eg.:Is the carton crunched, torn, punctured, etc? Describe the abnormality such as bent, sheared, crushed, rusted, spilled, lost material, not delivered, etc.',
      title: 'How is the state different from normal condition?'
    },
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

$("select[title$='Incident Time Period']").qtip({ 
    content: {
        text: 'Select an option to indicate the relationship between the work hours and the incident time. If the person is a field worker then driving between sites are included in working hours.'
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

$("textarea[title$='Property Damaged Details']").qtip({ 
    content: {
      text: 'Please provide specifics of the property damage in this incident. Please provide as much information as possible.',
      title: 'General Guidelines'
    },
    position: {
        adjust: {
            x: 215
        }
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


});
