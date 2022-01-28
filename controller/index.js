
'use strict'

const db = require('../database');

const getServiceArea = async id => {
    const { rows } = await db.query('SELECT * FROM adventure_servicearea WHERE id = $1', [id])
    return rows[0]
}

const getServiceAreaRightStation = async id => {
    const { rows } = await db.query('SELECT * FROM adventure_servicearea WHERE right_station_id = $1', [id])
    return rows[0]
}

const getServiceAreaLeftStation = async id => {
    const { rows } = await db.query('SELECT * FROM adventure_servicearea WHERE left_station_id = $1', [id])
    return rows[0]
}
let servicesArea = []

const calculate = async (serviceA, serviceB) => {
    servicesArea.push(serviceA)
    if (serviceA.kilometer == serviceB.kilometer){ 
        return null
    }
    
    if (serviceA.kilometer < serviceB.kilometer) {
        serviceA = serviceA.right_station_id == null ? await getServiceAreaLeftStation(serviceA.id) : await getServiceArea(serviceA.right_station_id)
        await calculate(serviceA, serviceB)
    }
    if (serviceA.kilometer > serviceB.kilometer) {
        serviceA = serviceA.left_station_id == null ? await getServiceAreaRightStation(serviceA.id) : await getServiceArea(serviceA.left_station_id)
        await calculate(serviceA, serviceB)
    }
    
}



const calculateRoute = async (pointA, pointB) => {
    servicesArea = []
    if (pointA == pointB) 
        return getServiceArea(pointA)
    else {
        await calculate(await getServiceArea(pointA), await getServiceArea(pointB))
        
    }
        
    servicesArea.pop()
    return servicesArea
}

const calculateCheap = async (pointA, pointB, number_license) => {

    return []
}
module.exports = { calculateRoute, calculateCheap }