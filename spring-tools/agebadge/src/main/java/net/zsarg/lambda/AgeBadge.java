package net.zsarg.lambda;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

/**
 * Hello world!
 *
 */
public class AgeBadge implements RequestHandler<Map<String, String>, String> {
	
	@Override
	public String handleRequest(Map<String, String> event, Context context) {
		String response = "200 OK";

		return response;
	}

}
