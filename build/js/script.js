// Filter
$(".nav-filter>div").each(function () {
    $(this).on("click", function () {
        changeActiveButton(this);
        if (!document.startViewTransition) changeActiveFilter(this);
        else document.startViewTransition(() => {
            changeActiveFilter(this);
        })
    });
});

function changeActiveButton(e) {
    $(".nav-filter>div").removeClass("active");
    $(e).addClass("active");
}

function changeActiveFilter(e) {
    $('[role="main"]').addClass("d-none");
    $(`[data-category="${$(e).attr("data-filter")}"]`).removeClass("d-none");
}
// End Filter

// Ticket and park price
let price = {
    park: {
        bus: 15000,
        car: 5000,
        motorcycle: 2000
    },
    ticket: {
        child: 5000,
        adult: 10000,
        tourist: 20000
    }
}
// Flag knob
let isProgrammatic = true;

// Init the price
$('[name$="price"]').each(function (index, element) {
    if (index % 2 == 0) $(element).attr("value", price[$(this).parent().parent().parent().attr("class")][$(this).attr("name").split("-")[0]]);
    else $(element).attr("value", price[$(this).parent().parent().parent().attr("class")][$(this).attr("name").split("-")[0]] / 1000);
});

function resetSettings() {
    $('[name$="price"]').each(function (index, element) {
        isProgrammatic = false;
        $(element).val($(element).attr("value")).trigger("change");
        isProgrammatic = true;
    });
}

function setPrice(e) {
    if (e.type == "text" && isProgrammatic) {
        $('[name="' + $(e).attr("name") + '"]').eq(0).val($(e).val().split(" ")[1].slice(0, -1) * 1000);
    }
    else {
        isProgrammatic = false;
        $('[name="' + $(e.target).attr("name") + '"]').eq(1).val(parseInt($(e.target).val(), 10) / 1000).trigger("change");
        isProgrammatic = true;
    }
}

function priceSet(index, element) {
    if ($(element).attr('class') === 'knob') {
        knobConfig.release = function () {
            setPrice(element);
        }
        $(element).knob(knobConfig);
    } else $(element).on("input", function (event) {
        setPrice(event);
    });
}

// Function for give price 
$('[name$="price"]').each(function () {
    $(this).each(priceSet);
});
// End Ticket and park price

// Form pengunjung
function cost() {
    $(".visitor-form .modal-body h4").text(($("#tourist").val() * price.ticket.tourist) + ($("#adult").val() * price.ticket.adult) + ($("#child").val() * price.ticket.child) + price.park[$("input[name='park']:checked").val()])
    $("#total").val(($("#tourist").val() * price.ticket.tourist) + ($("#adult").val() * price.ticket.adult) + ($("#child").val() * price.ticket.child) + price.park[$("input[name='park']:checked").val()])
}
$("#btn-visitor").on("click", cost);
// End for pengunjung

// Mandi bilas price
// for edit range now, in custom.js line 1548


// End Mandi bilas price