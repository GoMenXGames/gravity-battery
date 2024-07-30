
pi = 3.1415926535 // число пи
gravity_constant = 9.80665 // ускорение свободного падения, м/с^2

consumption_hour = 3000 // потребление, Вт*ч
generator_efficiency = 0.8 // КПД электрогенератора
generator_frequency = 50 // частота электродвижущей силы синхронного генератора, Гц
generator_magnets = 2 // количество пар полюсов генератора
planetary_ratio = 1 / 6 // передаточное число планетарной передачи
planetary_number = 4 // количество передач
planetary_efficient = 0.95 // КПД планетарной передачи
steel_elasticity = 2 * 10 ** 6 // модуль упругости материала шкива, Па
max_mass = 30000 // предельная масса груза, кг
steel_endurance = 294 * 10 ** 6 // предельное давление при скручивании, Па
load_dense = 2200 // плотность материала груза, кг/м^3
width_height_ratio = 0.75 // отношение длины основания призмы к высоте (>1 - плита, <1 - столб)
full_height = 130 // общая высота вместе с грузом, м

function xConsumption(consumption_hour) {
    return consumption_hour/ 60
}

consumption = consumption_hour / 60 // потребление, Вт
generator_power_in = consumption / generator_efficiency // мощность на роторе генератора, Вт
generator_rotations = generator_frequency / generator_magnets * 2 * pi // необходимое количество оборотов на роторе генератора, рад/с
generator_torque = generator_power_in / generator_rotations // необходимый крутящий момент для ротора, Н*м
gearbox_ratio = (planetary_ratio * planetary_efficient) ** planetary_number // общее передаточное число с учетом КПД
max_force = max_mass * gravity_constant // предельная сила, оказываемая на шкив, Н
pulley_section = max_force / steel_elasticity // сечение шкива, м^2
pulley_diameter = 2 * (pulley_section / pi) ** 0.5 // диаметр шкива, м
shaft_section = max_force / steel_endurance // сечение вала, м^2
shaft_diameter = 2 * (shaft_section / pi) ** 0.5 // диаметр вала шкива, м
pulley_angular_speed = generator_rotations * gearbox_ratio // угловая скорость, рад/с
peripheral_speed = pulley_angular_speed * (pulley_diameter / 2) // окружная скорость шкива, м/с

shaft_torque = generator_torque / gearbox_ratio // крутящий момент вала, Н*м
pulley_torque = pulley_diameter / shaft_diameter * shaft_torque // крутящий момент шкива, Н*м
load_force = pulley_torque / pulley_diameter // сила, создаваемая грузом на шкив, Н
load_mass = load_force / gravity_constant // необходимая масса груза, кг
load_volume = load_mass / load_dense // объем груза, м^3
load_width = width_height_ratio ** (1 / 3) * (load_volume ** (1 / 3)) // длина стороны основания призмы, м
load_height = load_volume / load_width ** 2 // высота груза, м

fall_height = full_height - load_height // высота падения груза, м
acceleration_time = peripheral_speed / gravity_constant // время достижения окружной скорости, с
acceleration_distance = peripheral_speed ** 2 / (2 * gravity_constant) // дистанция для достижения окружной скорости, м
falling_time = (fall_height - acceleration_distance) / peripheral_speed + acceleration_time// время падения груза, с


var x = {
        'pi': 3.1415926535,  // число пи
        'gravity_constant': 9.80665,// ускорение свободного падения, м/с^2
        'consumption_hour': 3000,// потребление, Вт*ч  
        'consumption': x['consumption_hour'] / 60,// потребление, Вт
        'generator_efficiency': 0.8,// КПД электрогенератора
        'generator_power_in': consumption / generator_efficiency,// мощность на роторе генератора, Вт
        'generator_frequency': 50,// частота электродвижущей силы синхронного генератора, Гц
        'generator_magnets': 2,// количество пар полюсов генератора
        'generator_rotations': generator_frequency / generator_magnets * 2 * pi,// необходимое количество оборотов на роторе генератора, рад/с
        'generator_torque': generator_power_in / generator_rotations,// необходимый крутящий момент для ротора, Н*м
    
        'planetary_ratio': 1 / 6,// передаточное число планетарной передачи
        'planetary_number': 4,// количество передач
        'planetary_efficient': 0.95,// КПД планетарной передачи
        'gearbox_ratio': (planetary_ratio * planetary_efficient) ** planetary_number,// общее передаточное число с учетом КПД
    
        'steel_elasticity': 2 * 10 ** 6,// модуль упругости материала шкива, Па
        'max_mass': 30000,// предельная масса груза, кг
        'max_force': max_mass * gravity_constant,// предельная сила, оказываемая на шкив, Н
        'pulley_section': max_force / steel_elasticity,// сечение шкива, м^2
        'pulley_diameter': 2 * (pulley_section / pi) ** 0.5,// диаметр шкива, м
    
        'steel_endurance': 294 * 10 ** 6,// предельное давление при скручивании, Па
        'shaft_section': max_force / steel_endurance,// сечение вала, м^2
        'shaft_diameter': 2 * (shaft_section / pi) ** 0.5,// диаметр вала шкива, м
        'pulley_angular_speed': generator_rotations * gearbox_ratio,// угловая скорость, рад/с
        'peripheral_speed': pulley_angular_speed * (pulley_diameter / 2),// окружная скорость шкива, м/с
    
        'shaft_torque': generator_torque / gearbox_ratio,// крутящий момент вала, Н*м
        'pulley_torque': pulley_diameter / shaft_diameter * shaft_torque,// крутящий момент шкива, Н*м
        'load_force': pulley_torque / pulley_diameter,// сила, создаваемая грузом на шкив, Н
        'load_mass': load_force / gravity_constant,// необходимая масса груза, кг
        'load_dense': 2200,// плотность материала груза, кг/м^3
        'load_volume': load_mass / load_dense,// объем груза, м^3
        'width_height_ratio': 0.75,// отношение длины основания призмы к высоте (>1 - плита, <1 - столб)
        'load_width': width_height_ratio ** (1 / 3) * (load_volume ** (1 / 3)),// длина стороны основания призмы, м
        'load_height': load_volume / load_width ** 2,// высота груза, м
    
        'full_height': 130,// общая высота вместе с грузом, м
        'fall_height': full_height - load_height,// высота падения груза, м
        'acceleration_time': peripheral_speed / gravity_constant,// время достижения окружной скорости, с
        'acceleration_distance': peripheral_speed ** 2 / (2 * gravity_constant),// дистанция для достижения окружной скорости, м
        'falling_time': (fall_height - acceleration_distance) / peripheral_speed + acceleration_time,// время падения груза, с
        "statements" : [
            ["Выходная мощность, Вт", consumption],
            ["Время работы батареи, мин", falling_time / 60],
            ["Угловая скорость ротора, об/мин", generator_rotations / (2 * pi) * 60],
            ["Крутящий момент ротора, Нм", generator_torque],
            ["Перемещение движущейся части, м", fall_height],
            ["Расстояние на ускорение груза, м", acceleration_distance],
            ["Время на ускорение груза, с", acceleration_time],
            ["Общее передаточное число", gearbox_ratio],
            ["Крутящий момент вала, Нм", shaft_torque],
            ["Крутящий момент шкива, Нм", pulley_torque],
            ["Угловая скорость шкива, об/мин", pulley_angular_speed / (2 * pi) * 60],
            ["Окружная скорость шкива, м/с", peripheral_speed],
            ["Диаметр шкива, м", pulley_diameter],
            ["Диаметр вала, м", shaft_diameter],
            ["Масса груза, кг", load_mass],
            ["Высота груза, м", load_height],
            ["Длина груза, м", load_width]
        ]
    }

let statements = [
    ["Выходная мощность, Вт", consumption],
    ["Время работы батареи, мин", falling_time / 60],
    ["Угловая скорость ротора, об/мин", generator_rotations / (2 * pi) * 60],
    ["Крутящий момент ротора, Нм", generator_torque],
    ["Перемещение движущейся части, м", fall_height],
    ["Расстояние на ускорение груза, м", acceleration_distance],
    ["Время на ускорение груза, с", acceleration_time],
    ["Общее передаточное число", gearbox_ratio],
    ["Крутящий момент вала, Нм", shaft_torque],
    ["Крутящий момент шкива, Нм", pulley_torque],
    ["Угловая скорость шкива, об/мин", pulley_angular_speed / (2 * pi) * 60],
    ["Окружная скорость шкива, м/с", peripheral_speed],
    ["Диаметр шкива, м", pulley_diameter],
    ["Диаметр вала, м", shaft_diameter],
    ["Масса груза, кг", load_mass],
    ["Высота груза, м", load_height],
    ["Длина груза, м", load_width]
]


function edit(e) {
    console.log(e.id)
    if (e.type == "range") {
        d("#" + e.id).value = e.value
    }
    else {
        d(".slider#" + e.id).value = e.value
    }
    setParam(e.id, e.value)
    
}

function setParam(name, value) {
    console.log(x);
    x[name] = value
    refresh()
}

function setMax(input, value) {
    console.log(input, value);
    input.max = value;
}

function d(selector) {
    return document.querySelector(selector);
}
 
function test(e) {
    console.log(e)
}

function load() {
    inputs = document.querySelectorAll("input")
    console.log(inputs)
    inputs.forEach(e => {
        console.log(e);
        e.setAttribute("oninput", "edit(this)")
        if (e.type == "range") {
            e.classList.add("slider")
            e.outerHTML = "<br>" + e.min + e.outerHTML + "<input class=\"sliderMax\" type=\"number\" value=\"" + e.max + "\" oninput=\"setMax(d(\'.slider\'),this.value)\" max=\"10000\" min=\"0\">";
            console.log(e.min)
        }
         //e.addEventListener("input", edit);
    })

    // document.querySelector("#logs").innerHTML = ""
    // statements.forEach((e) => {
    //     document.querySelector("#logs").innerHTML += e[0] + " = <b>" + e[1] + "</b><br>";
    // })
}

function refresh() {
    document.querySelector("#logs").innerHTML = ""
    x["statements"].forEach((e) => {
        document.querySelector("#logs").innerHTML += e[0] + " = <b>" + e[1] + "</b><br>";
    })
}
