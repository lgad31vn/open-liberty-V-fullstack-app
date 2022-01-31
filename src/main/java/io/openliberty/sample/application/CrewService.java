/*******************************************************************************
* Copyright (c) 2018 IBM Corporation and others.
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v1.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v10.html
*
* Contributors:
*     IBM Corporation - initial API and implementation
*******************************************************************************/
package io.openliberty.sample.application;

import java.util.Set;

import java.io.StringWriter;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.JsonArrayBuilder;
import javax.json.Json;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import javax.validation.Validator;
import javax.validation.ConstraintViolation;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;



@Path("/crew")
@ApplicationScoped 
public class CrewService {
    @Inject MongoDatabase db;

    @Inject 
    Validator validator; // validates bean instances

    @POST
	@Path("/{id}") 
	@Consumes(MediaType.APPLICATION_JSON) // header content-type application/json
	@Produces(MediaType.APPLICATION_JSON) 
	public String add(CrewMember crewMember) {
		
        // Get the violations set to validate the login 
		Set<ConstraintViolation<CrewMember>> violations = validator.validate(crewMember);
    

		if(violations.size() > 0) { // if there is any violation in violations set
			JsonArrayBuilder messages = Json.createArrayBuilder();
			for (ConstraintViolation<CrewMember> v : violations) { 			
				messages.add(v.getMessage());
			}
			return messages.build().toString();
		}

        // If there is no violation, moving on with mongoDB
		MongoCollection<Document> crew = db.getCollection("Crew"); // MongoCollection instance, like a table in sql
		Document newCrewMember = new Document();
		newCrewMember.put("Name",crewMember.getName());
		newCrewMember.put("Rank",crewMember.getRank());
		newCrewMember.put("CrewID",crewMember.getCrewID());
		crew.insertOne(newCrewMember); // populate the record to the instance
		return "";
	}

    @GET
    public String retrieve() {
        StringWriter sb = new StringWriter();
        try {
            // Document is like a placeholder, represent a map
			MongoCollection<Document> crew = db.getCollection("Crew"); // get collection instance
			
            sb.append("[");

			boolean first = true;
			for (Document d : crew.find()) {
				if (!first) sb.append(",");
				else first = false;
				sb.append(d.toJson()); // JSON object
			}
			sb.append("]");
		} catch (Exception e) {
			e.printStackTrace(System.out);
		}
		return sb.toString();
    }

    @DELETE
	@Path("/{id}") // delete using id
	public void remove(@PathParam("id") String id) {
		MongoCollection<Document> crew = db.getCollection("Crew");
		crew.deleteOne(new Document("_id", new ObjectId(id)));
	}
}